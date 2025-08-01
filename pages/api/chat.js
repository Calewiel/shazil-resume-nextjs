// pages/api/chat.js

// Response filtering function
const filterResponse = (response) => {
  const professionalTopics = [
    'product', 'manager', 'shazil', 'scale', 'framework', 'experience',
    'career', 'achievement', 'team', 'leadership', 'revenue', 'users',
    'stukent', 'halfort', 'bridgeblue', 'education', 'skills'
  ];
  
  const lowerResponse = response.toLowerCase();
  
  // If response doesn't contain professional keywords, replace it
  if (!professionalTopics.some(topic => lowerResponse.includes(topic))) {
    return "I'm here to discuss Shazil's professional background and achievements. What would you like to know about his product management experience, the S.C.A.L.E framework, or his career journey?";
  }
  
  return response;
};

// Enhanced fallback responses for when Claude API is unavailable
function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for off-topic requests
  const offTopicKeywords = ['weather', 'sports', 'politics', 'personal', 'dating', 'religion', 'cooking', 'travel', 'movie', 'music', 'game', 'joke', 'story'];
  if (offTopicKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return "I'm here to discuss Shazil's professional background and achievements. Ask me about his product management experience, the S.C.A.L.E framework, or his career journey!";
  }
  
  if (lowerMessage.includes('scale') || lowerMessage.includes('framework')) {
    return `The S.C.A.L.E framework is Shazil's signature product management methodology focusing on:

Scalable - Building systems that grow with your product
Customizable - Adapting to different team needs  
Agile - Embracing iterative development
Lean - Eliminating waste and focusing on value
Execution - Driving results through clear action

This framework has achieved:
• 20-45% reduction in project delays
• 15-30% increase in on-time deliveries
• Adoption across multiple organizations

Learn more at: scaleframework.notion.site

For detailed discussions, reach out to Shazil directly at snsindhu@gmail.com`;
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    return `Shazil has 10+ years of product management experience:

🎯 **Current Role**: Group Product Manager at Stukent (EdTech)
📈 **Key Achievements**: 
   • Scaled products to $27M+ revenue
   • Served 1M+ users across platforms
   • Led teams of 20+ across 3 countries (Pakistan, Australia, US)
   • Increased user engagement by 140%

🏢 **Previous Companies**: 
   • Halfort (HealthTech) - Head of Product (US)
   • BridgeBlue (EdTech) - Lead Product Manager (Sydney, Australia)

🎓 **Education**: BBA (Hons) from Lahore School of Economics (Pakistan)
🏆 **Certifications**: CSPO, Google Data Analytics, AI/ML

Contact: snsindhu@gmail.com for detailed discussions!`;
  }
  
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
    return `Shazil is an AI-driven product leader with expertise in:

🤖 **AI Product Development**:
   • Designed AI explainer and scoring algorithms at Stukent
   • Increased user engagement by 140% through AI implementation
   • Experience with TensorFlow, OpenAI APIs, ML frameworks

📊 **AI & Analytics**:
   • SQL, Tableau, Mixpanel, Amplitude
   • A/B testing and experimentation
   • Data-driven decision making

☁️ **Technical Platforms**: AWS, Azure, Google Cloud
🔗 **APIs**: REST APIs, GraphQL development

He's passionate about using AI to create better user experiences and drive business growth.

Interested in discussing AI strategy? Contact Shazil at snsindhu@gmail.com`;
  }
  
  if (lowerMessage.includes('revenue') || lowerMessage.includes('money') || lowerMessage.includes('business')) {
    return `Shazil has a proven track record of driving business results:

💰 **Revenue Impact**:
   • Generated $27M+ total revenue across platforms
   • Scaled healthcare platform to $10M+ ARR at Halfort
   • Created loyalty program generating $17M+ at BridgeBlue

📈 **Growth Metrics**:
   • 230% increase in applications (BridgeBlue)
   • 150% increase in patient payments (Halfort)
   • 90% user adoption within first month
   • 30% YoY revenue growth at Stukent

🎯 **Business Skills**:
   • 0-to-1 product building
   • Cross-functional team leadership (20+ members)
   • Strategic product roadmapping
   • Market expansion across 3 countries

Want to discuss growth strategies? Reach out: snsindhu@gmail.com`;
  }
  
  // Default response
  return `Thanks for your question about Shazil! I'd love to help you learn more about his:

🚀 **10+ years** of product management experience
💼 **Leadership** of 20+ person cross-functional teams  
📊 **S.C.A.L.E framework** adopted by multiple organizations
🌍 **International experience** across 3 countries (Pakistan, Australia, US)
💰 **$27M+ revenue** generated across platforms
👥 **1M+ users** served with innovative solutions

For specific questions about his experience, achievements, or the S.C.A.L.E framework, please ask more details!

Or contact Shazil directly: snsindhu@gmail.com | in/shazilsindhu`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, systemPrompt } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Additional server-side filtering
  if (message.length > 300) {
    return res.status(400).json({ error: 'Message too long' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022', // Using the newest fast model
        max_tokens: 5000, // Increased for better responses
        temperature: 0.1, // Low temperature for accuracy
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      }),
    });

    if (!response.ok) {
      console.error('Claude API error:', response.status, response.statusText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract and filter the text content from Claude's response
    let aiResponse = data.content[0].text;
    aiResponse = filterResponse(aiResponse); // Apply filtering

    return res.status(200).json({ 
      response: aiResponse,
      usage: data.usage // Optional: track token usage
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Return a fallback response that still provides value
    const fallbackResponse = generateFallbackResponse(message);
    
    return res.status(200).json({ 
      response: fallbackResponse,
      fallback: true 
    });
  }
}