import { useState } from 'react'
import WidgetPreview from './WidgetPreview'
import './WidgetGenerator.css'

export default function WidgetGenerator() {
  const [settings, setSettings] = useState({
    btnColor: '#16BE45',
    ctaText: 'WhatsApp Us',
    cornerRadius: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    btnPosition: 'right',
    whatsAppNumber: '',
    welcomeMessage: 'Hello',
    zIndex: 999999,
    btnColorScheme: 'light'
  })

  const [widgetSettings, setWidgetSettings] = useState({
    title: 'BrandName',
    subTitle: 'Typically replies in a day',
    headerBackgroundColor: '#FBFFC8',
    headerColorScheme: 'dark',
    greetingText: 'Hi there! \nHow can I help you?',
    ctaText: 'Start Chat',
    btnColor: '#1A1A1A',
    cornerRadius: 40,
    welcomeMessage: 'Hello',
    btnColorScheme: 'light',
    brandImage: 'https://uploads-ssl.webflow.com/5f68a65cd5188c058e27c898/6204c4267b92625c9770f687_whatsapp-chat-widget-dummy-logo.png',
    darkHeaderColorScheme: { title: '#333333', subTitle: '#4F4F4F' }
  })

  const [generatedScript, setGeneratedScript] = useState('')
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }))
  }

  const handleWidgetChange = (e) => {
    const { name, value } = e.target
    setWidgetSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleWidgetNumberChange = (e) => {
    const { name, value } = e.target
    setWidgetSettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }))
  }

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10 && cleaned.length <= 15
  }

  const generateScript = () => {
    if (!settings.whatsAppNumber || !validatePhone(settings.whatsAppNumber)) {
      alert('Please enter a valid WhatsApp number (10-15 digits)')
      return
    }

    const domain = window.location.origin
    const script = `<script async src="${domain}/embeds/embed.min.js"></script>
<script>
  var wa_btnSetting = ${JSON.stringify(settings, null, 2)};
  var wa_widgetSetting = ${JSON.stringify(widgetSettings, null, 2)};
  window.onload = () => {
    _waEmbed(wa_btnSetting, wa_widgetSetting);
  };
</script>`

    setGeneratedScript(script)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'whatsapp-widget.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="generator-container">
      <header className="header">
        <h1>WhatsApp Widget Generator</h1>
        <p>Create a custom WhatsApp widget for your website</p>
      </header>

      <div className="content">
        <div className="form-section">
          <h2>Widget Settings</h2>
          
          <div className="form-group">
            <label htmlFor="whatsAppNumber">
              WhatsApp Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="whatsAppNumber"
              name="whatsAppNumber"
              value={settings.whatsAppNumber}
              onChange={handleChange}
              placeholder="919876543210"
              required
            />
            <small>Include country code (e.g., 919876543210 for India)</small>
          </div>

          <div className="form-group">
            <label htmlFor="ctaText">Button Text</label>
            <input
              type="text"
              id="ctaText"
              name="ctaText"
              value={settings.ctaText}
              onChange={handleChange}
              placeholder="WhatsApp Us"
            />
          </div>

          <div className="form-group">
            <label htmlFor="welcomeMessage">Welcome Message</label>
            <textarea
              id="welcomeMessage"
              name="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={handleChange}
              placeholder="Hello! How can we help you?"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="btnColor">Button Color</label>
              <input
                type="color"
                id="btnColor"
                name="btnColor"
                value={settings.btnColor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="btnColorScheme">Color Scheme</label>
              <select
                id="btnColorScheme"
                name="btnColorScheme"
                value={settings.btnColorScheme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="btnPosition">Position</label>
              <select
                id="btnPosition"
                name="btnPosition"
                value={settings.btnPosition}
                onChange={handleChange}
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cornerRadius">Corner Radius (px)</label>
              <input
                type="number"
                id="cornerRadius"
                name="cornerRadius"
                value={settings.cornerRadius}
                onChange={handleNumberChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marginBottom">Bottom Margin (px)</label>
              <input
                type="number"
                id="marginBottom"
                name="marginBottom"
                value={settings.marginBottom}
                onChange={handleNumberChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="marginLeft">Left Margin (px)</label>
              <input
                type="number"
                id="marginLeft"
                name="marginLeft"
                value={settings.marginLeft}
                onChange={handleNumberChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="marginRight">Right Margin (px)</label>
              <input
                type="number"
                id="marginRight"
                name="marginRight"
                value={settings.marginRight}
                onChange={handleNumberChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="zIndex">Z-Index</label>
            <input
              type="number"
              id="zIndex"
              name="zIndex"
              value={settings.zIndex}
              onChange={handleNumberChange}
              min="0"
            />
          </div>

          <h2 style={{ marginTop: '2rem' }}>Chat Widget Settings</h2>

          <div className="form-group">
            <label htmlFor="title">Widget Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={widgetSettings.title}
              onChange={handleWidgetChange}
              placeholder="BrandName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subTitle">Widget Subtitle</label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              value={widgetSettings.subTitle}
              onChange={handleWidgetChange}
              placeholder="Typically replies in a day"
            />
          </div>

          <div className="form-group">
            <label htmlFor="greetingText">Greeting Text</label>
            <textarea
              id="greetingText"
              name="greetingText"
              value={widgetSettings.greetingText}
              onChange={handleWidgetChange}
              placeholder="Hi there!\nHow can I help you?"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="headerBackgroundColor">Header Background</label>
              <input
                type="color"
                id="headerBackgroundColor"
                name="headerBackgroundColor"
                value={widgetSettings.headerBackgroundColor}
                onChange={handleWidgetChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="headerColorScheme">Header Scheme</label>
              <select
                id="headerColorScheme"
                name="headerColorScheme"
                value={widgetSettings.headerColorScheme}
                onChange={handleWidgetChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="brandImage">Brand Image URL</label>
            <input
              type="url"
              id="brandImage"
              name="brandImage"
              value={widgetSettings.brandImage}
              onChange={handleWidgetChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <button className="generate-btn" onClick={generateScript}>
            Generate Script
          </button>
        </div>

        <div className="preview-section">
          <h2>Live Preview</h2>
          <WidgetPreview settings={settings} widgetSettings={widgetSettings} />
        </div>

        {generatedScript && (
          <div className="output-section">
            <h2>Generated Script</h2>
            <p>Copy this code and paste it before the closing &lt;/body&gt; tag in your website:</p>
            
            <div className="code-container">
              <pre><code>{generatedScript}</code></pre>
            </div>

            <div className="action-buttons">
              <button className="copy-btn" onClick={copyToClipboard}>
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
              <button className="download-btn" onClick={downloadScript}>
                Download HTML
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
