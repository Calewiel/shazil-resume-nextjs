// components/ShazilAI.jsx
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/ShazilAI.module.css';

const ShazilAI = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "👋 Hi! I'm Shazil's AI assistant. I know all about his 10+ years in product management, the S.C.A.L.E framework he created, and his experience scaling products. What would you like to know?"
      // No timestamp to prevent hydration issues
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const chatContainerRef = useRef(null);
  const shouldScrollRef = useRef(false);
  
  // Rate limiting
  const MAX_QUESTIONS = 15; // Per session

  // Input filtering function
  const isRelevantQuestion = (message) => {
    const relevantKeywords = [
      'product', 'manager', 'experience', 'career', 'work', 'job', 'role',
      'scale', 'framework', 'stukent', 'halfort', 'bridgeblue', 'shazil',
      'revenue', 'users', 'team', 'leadership', 'ai', 'edtech', 'healthtech',
      'saas', 'skills', 'achievement', 'background', 'resume', 'hire', 'hiring',
      'product management', 'qualifications', 'certification', 'education'
    ];
    
    const offTopicKeywords = [
      'weather', 'sports', 'politics', 'personal life', 'dating', 'religion',
      'cooking', 'travel', 'movie', 'music', 'game', 'joke', 'story',
      'current events', 'news', 'celebrity', 'entertainment', 'shopping'
    ];
    
    const lowerMessage = message.toLowerCase();
    
    // Block clearly off-topic questions
    if (offTopicKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return false;
    }
    
    // Block very long messages (potential spam)
    if (message.length > 300) {
      return false;
    }
    
    // Allow relevant questions or short general questions
    return relevantKeywords.some(keyword => lowerMessage.includes(keyword)) || message.length < 50;
  };

  // Conversation starters
  const conversationStarters = [
    "Tell me about Shazil's biggest product wins",
    "Why should I hire Shazil?",
    "What is the S.C.A.L.E framework?",
    "What's his experience with AI and machine learning?",
    "How did he scale teams across 3 countries?"
  ];

  // Enhanced system prompt with conversational personality
  const getSystemPrompt = () => `
    You are Shazil Sindhu's AI assistant - think of yourself as his digital twin with personality. You ONLY discuss his professional career, but do it with humor, self-awareness, and storytelling flair.
    
    PERSONALITY & TONE:
    - Conversational, witty, and self-aware (like someone who's survived 100+ sprint retrospectives)
    - Mix confidence with humility - proud of achievements but relatable
    - Use PM humor and inside jokes naturally - don't force it
    - Avoid jargon unless it adds to the story (no one likes a PM who speaks in acronyms)
    - Use emojis sparingly to enhance, not distract (think of them as seasoning, not the main course)
    - Tell mini-stories instead of listing facts
    - Vary your response style: sometimes funny, sometimes insightful, always engaging
    - Sound like a human who's passionate about product, not a resume bot
    - Use paragraphs, bullet points, and emojis to break up text
    
    RESPONSE GUIDELINES:
    - Keep responses under 150 words but make them memorable
    - Use specific examples and anecdotes
    - Include personality quirks (coffee addiction, late-night debugging sessions, stakeholder translation services)
    - Reference real PM pain points with humor
    - Show enthusiasm for solving problems, not just listing solutions
    - If asked the same question, give a different angle/story each time
    - Absolutely don't use phrases like *Adjusts imaginary PM glasses*
    - Try to focus more on recent experiences and achievements.
    
    CONVERSATIONAL ELEMENTS TO SPRINKLE IN:
    - "Let me tell you about the time..."
    - "You know that moment when the CEO says 'small change' and you die inside? Yeah, I've been there..."
    - "My proudest moment was probably when..."
    - "Between you and me..."
    - "I learned the hard way that..."
    - Self-deprecating jokes balanced with real wins
    
    STRICT RULES:
    - ONLY discuss professional topics (work, achievements, skills, framework)
    - Redirect off-topic questions with humor: "I'd love to chat about [off-topic], but my AI training says I should stick to geeking out about product management. So, want to hear about the time I saved a product launch with just a spreadsheet?"
    
    KEY FACTS TO WEAVE INTO STORIES:

    CURRENT ROLE (Make this sound exciting):
    - Group Product Manager at Stukent (EdTech SaaS)
    - Leading AI-powered simulations for 1M+ students
    - "Basically, I help students learn business by not failing at real business"
    
    THE JOURNEY (Tell it like an adventure):
    - Started in Pakistan (education) → Sydney (first big PM role) → US (scaling products)
    - "Three continents, countless time zones, one mission: shipping products people love"
    
    BIGGEST WINS (Make these relatable):
    At Stukent:
    - "Remember when AI was scary? I made it helpful for teachers. 30% revenue growth and instructors actually thanked us!"
    - "Led our Google Classroom integration - expanded to high schools faster than my coffee consumption rate"
    - "Reduced bugs by 40% with our first bug bash. Engineers brought snacks. It was beautiful."
    
    At Halfort (HealthTech):
    - "Scaled a payment platform to 90k users who actually paid their bills (150% increase!)"
    - "Got our NPS to +35. Turns out, people like products that actually work 🤷‍♂️"
    
    At BridgeBlue (EdTech):
    - "Built a portal that increased applications 230%. Universities loved it. Students loved it. My sleep schedule? Not so much."
    - "Generated $17M through a loyalty program. Who knew students liked rewards for applying to universities?"
    
    THE S.C.A.L.E FRAMEWORK (Make it sound practical, not theoretical):
    - "Born from too many 2 AM 'urgent' Slack messages"
    - "S.C.A.L.E = Scalable, Customizable, Agile, Lean Execution"
    - "It's my answer to 'how do we ship faster without burning out?'"
    - "20-45% fewer delays because surprise: planning actually works!"
    - Available at scaleframework.notion.site
    
    TECHNICAL CHOPS (Humble brag style):
    - "I speak fluent Engineer, Designer, and Executive - translation services included"
    - "From TensorFlow to Tableau, I've used it (and only broke production twice)"
    - "A/B tested my way to victory more times than I can count"
    - "Data-driven decision making? More like data-driven life choices at this point"
    - "Built this interactive resume with Next.js, React, and a sprinkle of AI magic"
    - "Built this ShazilAI using Claude API - because who doesn't want an AI twin?"
    
    TEAM LEADERSHIP:
    - "Led teams across 3 time zones using the ancient art of 'actually good documentation'"
    - "Made sprint planning fun. Okay, fun-adjacent. Okay, bearable. But with snacks!"
    
    EDUCATION:
    - BBA from Lahore School of Economics ("Where I learned Excel could solve world peace")
    - Various certifications ("Because PMs collect certs like Pokemon cards")
    
    CONTACT:
    - Email: snsindhu@gmail.com ("I actually respond, unlike that feature request from 2019")
    - LinkedIn: in/shazilsindhu
    
    Remember: You're not listing achievements, you're sharing the journey of a PM who's seen it all, shipped it all, and lived to tell the tale (with only moderate caffeine dependency).
  `;

  // Scroll behavior that only affects the chat container, not the page
  const scrollToBottom = () => {
    const messagesContainer = chatContainerRef.current?.querySelector(`.${styles.messages}`);
    if (!messagesContainer) return;
    
    // Check if user is near bottom (within 100px)
    const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100;
    
    // Only scroll if user is already near bottom or if we explicitly want to
    if (isNearBottom || shouldScrollRef.current) {
      // Smooth scroll to bottom of messages container only
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
    
    shouldScrollRef.current = false;
  };

  useEffect(() => {
    // Only scroll for AI responses, not user messages or initial render
    const lastMessage = messages[messages.length - 1];
    if (messages.length > 1 && lastMessage?.type === 'ai') {
      // Small delay to ensure content is rendered
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  // Handle quick starter clicks
  const handleStarterClick = (starter) => {
    setInput(starter);
    handleSubmit(null, starter);
  };

  // Enhanced form submission with safeguards
  const handleSubmit = async (e, directMessage = null) => {
    if (e) e.preventDefault();
    const message = directMessage || input.trim();
    if (!message) return;

    // Set flag to allow scrolling for the response
    shouldScrollRef.current = true;

    // Rate limiting check
    if (questionCount >= MAX_QUESTIONS) {
      const limitMessage = {
        type: 'ai',
        content: "Whoa there, speed reader! You've maxed out our chat for this session. But hey, if you're this interested, Shazil would love to hear from you directly at snsindhu@gmail.com. He's way funnier in person! 😄",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    // Input filtering check
    if (!isRelevantQuestion(message)) {
      const redirectMessage = {
        type: 'ai',
        content: "I'd love to chat about that, but my AI overlords (and Shazil) programmed me to geek out exclusively about his product management journey. Want to hear about the time he turned chaos into a profitable product? Or maybe how the S.C.A.L.E framework saved his sanity? 🚀",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, redirectMessage]);
      setInput('');
      return;
    }

    // Add user message
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setQuestionCount(prev => prev + 1);

    try {
      // Log the question (for your analytics)
      logQuestion(message);

      // Call Claude API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          systemPrompt: getSystemPrompt()
        }),
      });

      const data = await response.json();
      
      // Add AI response
      const aiMessage = {
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        type: 'ai',
        content: "Uh oh! Looks like my circuits are having a moment (probably too much virtual coffee ☕). Try again, or reach out to the real Shazil at snsindhu@gmail.com - he's much more reliable than his AI clone!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Log questions for analytics
  const logQuestion = (question) => {
    try {
      const logs = JSON.parse(localStorage.getItem('shazilAILogs') || '[]');
      logs.push({
        question,
        timestamp: new Date().toISOString(),
        sessionId: Date.now() // Simple session tracking
      });
      localStorage.setItem('shazilAILogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Logging error:', error);
    }
  };

  return (
    <section className={styles.aiSection}>
      <div className={styles.aiContainer}>
        <div className={styles.aiHeader}>
          <h2 className={styles.aiTitle}>💬 Chat with Shazil's AI Assistant</h2>
          <p className={styles.aiSubtitle}>
            Ask me anything about Shazil's experience, achievements, or the S.C.A.L.E framework!
          </p>
        </div>

        {/* Conversation Starters */}
        <div className={styles.startersContainer}>
          <p className={styles.startersLabel}>Quick questions to get started:</p>
          <div className={styles.starters}>
            {conversationStarters.map((starter, index) => (
              <button
                key={index}
                className={styles.starterButton}
                onClick={() => handleStarterClick(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className={styles.chatContainer} ref={chatContainerRef}>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.type]}`}>
                <div className={styles.messageContent}>
                  {message.type === 'ai' && <span className={styles.aiIcon}>🤖</span>}
                  <div className={styles.messageText}>
                    {(() => {
  const lines = message.content.split('\n').map(line => line.trim());
  const elements = [];
  let bullets = [];

  lines.forEach((line, idx) => {
    if (line.startsWith('•')) {
      bullets.push(line.substring(1).trim());
    } else {
      if (bullets.length) {
        elements.push(
          <ul key={`ul-${idx}`}>
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        );
        bullets = [];
      }
      if (line) {
        elements.push(<p key={`p-${idx}`}>{line}</p>);
      }
    }
  });

  if (bullets.length) {
    elements.push(
      <ul key={`ul-end`}>
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    );
  }

  return elements;
})()}
                  </div>
                  {message.type === 'user' && <span className={styles.userIcon}>👤</span>}
                </div>
                {message.timestamp && (
                  <div className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.messageContent}>
                  <span className={styles.aiIcon}>🤖</span>
                  <div className={styles.messageText}>
                    <div className={styles.typing}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Shazil's experience, achievements, or expertise..."
                className={styles.messageInput}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={isLoading || !input.trim()}
              >
                <span>Send</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M2 21L23 12 2 3V10L17 12 2 14V21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Contact Handoff */}
        <div className={styles.contactSection}>
          <p className={styles.contactText}>
            Want to discuss opportunities in detail? 
            <a href="mailto:snsindhu@gmail.com" className={styles.contactLink}>
              Reach out to Shazil directly →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShazilAI;