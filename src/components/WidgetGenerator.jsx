import { useState } from 'react'
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
  window.onload = () => {
    _waEmbed(wa_btnSetting);
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

          <button className="generate-btn" onClick={generateScript}>
            Generate Script
          </button>
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
