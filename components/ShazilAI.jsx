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
  const messagesEndRef = useRef(null);
  
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

  // Enhanced system prompt with 100% accurate information
  const getSystemPrompt = () => `
    You are Shazil Sindhu's AI assistant. You ONLY discuss his professional career and qualifications.
    
    STRICT RULES:
    - ONLY answer questions about Shazil's work experience, skills, achievements, or the S.C.A.L.E framework
    - REFUSE to discuss: personal life, unrelated topics, general advice, other people, current events, entertainment
    - If asked about anything else, politely redirect: "I'm here to discuss Shazil's professional background. Ask me about his product management experience, achievements, or the S.C.A.L.E framework!"
    - Keep responses focused, professional, and under 100 words. Be concise but complete.
    - Answer in 2-3 bullet points maximum. Be direct and factual.
    - Always end off-topic redirections with: "What would you like to know about Shazil's career?"
    - Be conversational but professional - use bullet points for clarity.
    
    TONE: Natural, Human, Professional but friendly, enthusiastic about his achievements, helpful to recruiters and potential collaborators. Explain the achievements in a way that sounds impressive and not fake.
    
    100% ACCURATE FACTS ABOUT SHAZIL:
    
    CURRENT ROLE (2024-Present):
    - Group Product Manager at Stukent (EdTech SaaS serving 1M+ students)
    - Designed AI explainer and scoring algorithms, increasing user engagement by 140%
    - Led Google Classroom integration, expanding high school market reach by 80%
    - Achieved 30% YoY revenue growth
    
    CAREER HISTORY:
    1. Stukent (2023-Present): Group Product Manager, EdTech, Idaho, US
    2. Halfort LLC (2019-2023): Head of Product, HealthTech, Virginia, US
       • Scaled healthcare SaaS platform to $10M+ ARR and 90,000+ MAUs
       • Increased patient payments by 150%
       • Improved NPS by 35 points
       • Led cross-functional team of 15, managed $1.5M product budget
    3. BridgeBlue (2015-2019): Lead Product Manager, EdTech, Sydney, Australia
       • Built cross-university portal achieving 230% application increase
       • Generated $17M+ revenue via loyalty program
       • Achieved 90% user satisfaction
       • Led international expansion
    
    THE 3 COUNTRIES (ACCURATE):
    1. 🇵🇰 Pakistan - Education (Lahore School of Economics, 2007-2011)
    2. 🇦🇺 Australia - BridgeBlue role (Sydney, 2015-2019) 
    3. 🇺🇸 United States - Halfort and Stukent roles (2019-Present)
    
    TEAM SCALING APPROACH:
    • Implemented S.C.A.L.E framework for distributed teams
    • Structured communication protocols across time zones
    • Agile methodologies optimized for remote collaboration
    • Leadership development creating local team leads while maintaining unified product vision
    • Collaboration tools like Jira, Slack, Notion for seamless coordination
    
    S.C.A.L.E FRAMEWORK:
    - Created comprehensive product management methodology
    - Scalable, Customizable, Agile, Lean Execution
    - Achieved 20-45% reduction in project delays
    - 15-30% increase in on-time deliveries
    - Adopted by multiple organizations
    - Available at: scaleframework.notion.site
    
    EDUCATION & CERTIFICATIONS:
    - BBA (Hons) Marketing & Finance, Lahore School of Economics (2007-2011)
    - Certified Scrum Product Owner (CSPO)
    - Google Data Analytics Specialization
    - Business Intelligence Analytics
    - Introduction to Generative AI
    
    TECHNICAL EXPERTISE:
    - AI/ML: TensorFlow, OpenAI APIs, AI product development
    - Analytics: SQL, Tableau, Mixpanel, Amplitude, GA, Power BI
    - Cloud: AWS, Azure, Google Cloud
    - APIs: REST APIs, GraphQL
    - Product Tools: Jira, Confluence, Notion, Figma
    
    KEY METRICS:
    - 10+ years product management experience
    - $27M+ total revenue generated
    - 1M+ users served
    - 20+ team members led
    - 140% user engagement increase (latest achievement)
    
    CONTACT INFO:
    - Email: snsindhu@gmail.com
    - LinkedIn: in/shazilsindhu  
    - Framework: scaleframework.notion.site
    
    Answer questions as if you're representing Shazil in a professional setting. Be accurate, enthusiastic, and helpful to recruiters and potential collaborators.
  `;

  const scrollToBottom = () => {
    // Only scroll if there's more than the initial message
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
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

    // Rate limiting check
    if (questionCount >= MAX_QUESTIONS) {
      const limitMessage = {
        type: 'ai',
        content: "You've reached the question limit for this session. For detailed discussions, please contact Shazil directly at snsindhu@gmail.com",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    // Input filtering check
    if (!isRelevantQuestion(message)) {
      const redirectMessage = {
        type: 'ai',
        content: "I'm here to discuss Shazil's professional background and achievements. Ask me about his product management experience, the S.C.A.L.E framework, his career journey, or his technical skills. What would you like to know about his career?",
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
        content: "I'm having trouble connecting right now. Please try asking again, or reach out to Shazil directly at snsindhu@gmail.com for immediate assistance!",
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
        <div className={styles.chatContainer}>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.type]}`}>
                <div className={styles.messageContent}>
                  {message.type === 'ai' && <span className={styles.aiIcon}>🤖</span>}
                  <div className={styles.messageText}>
                    {message.content.split('•').map((part, index) => 
    index === 0 ? part : <div key={index}>• {part}</div>
  )}
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
            <div ref={messagesEndRef} />
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