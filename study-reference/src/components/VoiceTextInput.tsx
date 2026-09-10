import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../useLanguage'

type SpeechResultLike = {
  isFinal: boolean
  0: { transcript: string }
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  onstart: (() => void) | null
  onresult: ((event: { resultIndex: number; results: ArrayLike<SpeechResultLike> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

type VoiceTextInputProps = {
  id: string
  value: string
  onValueChange: (value: string) => void
  multiline?: boolean
  disabled?: boolean
  required?: boolean
  placeholder?: string
  autoComplete?: string
  ariaLabel?: string
}

function joinTranscript(original: string, transcript: string, multiline: boolean) {
  const spoken = transcript.trim()
  if (!spoken) return original
  if (!original.trim()) return spoken
  const separator = /\s$/.test(original) ? '' : multiline ? '\n' : ' '
  return `${original}${separator}${spoken}`
}

export function VoiceTextInput({
  id,
  value,
  onValueChange,
  multiline = false,
  disabled = false,
  required = false,
  placeholder,
  autoComplete,
  ariaLabel,
}: VoiceTextInputProps) {
  const { lang, tx } = useLanguage()
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const startingValueRef = useRef('')
  const transcriptRef = useRef('')
  const hadErrorRef = useRef(false)
  const onValueChangeRef = useRef(onValueChange)
  const [isListening, setIsListening] = useState(false)
  const [status, setStatus] = useState('')
  const [supported] = useState(() => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition))

  onValueChangeRef.current = onValueChange

  useEffect(() => () => {
    recognitionRef.current?.abort()
  }, [])

  const errorMessage = (error: string) => {
    if (error === 'not-allowed' || error === 'service-not-allowed') return tx('未获得麦克风权限，请允许访问后重试。', 'Microphone access was not granted. Allow access and try again.')
    if (error === 'no-speech') return tx('没有检测到语音，请重试。', 'No speech was detected. Please try again.')
    if (error === 'audio-capture') return tx('没有找到可用的麦克风。', 'No available microphone was found.')
    if (error === 'network') return tx('语音服务暂时无法连接，请稍后重试。', 'The speech service is temporarily unavailable. Please try again later.')
    return tx('语音输入未能完成，请重试或使用键盘输入。', 'Voice input could not be completed. Try again or use the keyboard.')
  }

  const startListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition || disabled) return

    const recognition = new Recognition()
    recognitionRef.current = recognition
    startingValueRef.current = value
    transcriptRef.current = ''
    hadErrorRef.current = false
    recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US'
    recognition.continuous = true
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onstart = () => {
      setIsListening(true)
      setStatus(tx('正在听写，说完后点击“停止”。', 'Listening… Click Stop when you are finished.'))
    }
    recognition.onresult = (event) => {
      let nextTranscript = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        if (result.isFinal) nextTranscript += result[0].transcript
      }
      if (!nextTranscript.trim()) return
      transcriptRef.current = `${transcriptRef.current} ${nextTranscript}`.trim()
      onValueChangeRef.current(joinTranscript(startingValueRef.current, transcriptRef.current, multiline))
      setStatus(tx('已加入识别到的文字，可以继续说或点击“停止”。', 'Recognized text was added. Keep speaking or click Stop.'))
    }
    recognition.onerror = (event) => {
      hadErrorRef.current = true
      setIsListening(false)
      setStatus(errorMessage(event.error))
    }
    recognition.onend = () => {
      recognitionRef.current = null
      setIsListening(false)
      if (!hadErrorRef.current) setStatus(tx('语音输入已停止，可以继续编辑文字。', 'Voice input stopped. You can continue editing the text.'))
    }

    try {
      recognition.start()
    } catch {
      recognitionRef.current = null
      setIsListening(false)
      setStatus(tx('无法启动语音输入，请重试或使用键盘输入。', 'Voice input could not start. Try again or use the keyboard.'))
    }
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
  }

  const inputProps = {
    id,
    value,
    disabled,
    required,
    placeholder,
    'aria-label': ariaLabel,
    'aria-describedby': `${id}-voice-status`,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onValueChange(event.target.value),
  }

  return (
    <div className="voice-text-input">
      {multiline
        ? <textarea {...inputProps} />
        : <input {...inputProps} type="text" autoComplete={autoComplete} />}
      <div className="voice-input-controls">
        <button
          className={`voice-input-button ${isListening ? 'is-listening' : ''}`}
          type="button"
          disabled={disabled || !supported}
          aria-pressed={isListening}
          onClick={isListening ? stopListening : startListening}
        >
          <span aria-hidden="true">{isListening ? '■' : '●'}</span>
          {isListening ? tx('停止语音输入', 'Stop voice input') : tx('开始语音输入', 'Start voice input')}
        </button>
        {!supported ? <span className="voice-input-unavailable">{tx('当前浏览器不支持语音输入', 'Voice input is unavailable in this browser')}</span> : null}
      </div>
      <span className="voice-input-status" id={`${id}-voice-status`} role="status" aria-live="polite">{status}</span>
    </div>
  )
}
