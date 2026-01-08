import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const DIMTSChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hello! I\'m DIMTS Smart Assistant. I can help you with information about our services, contact details, projects, and more. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Compact knowledge base - organized by topics
  const knowledge = {
    about: {
      keywords: ['what is dimts', 'about', 'company', 'who are', 'tell me about', 'introduction'],
      response: `**DIMTS (Delhi Integrated Multi-Modal Transit System Limited)** is a joint venture company established in April 2006.

**Ownership:**
• Government of NCT of Delhi (GNCTD) - 50%
• IDFC Foundation - 50%

**CEO:** Rakesh Jain

We specialize in comprehensive urban transportation solutions including bus operations, intelligent transport systems, and consultancy services across India and internationally.`
    },
    
    ownership: {
      keywords: ['owner', 'owns', 'who runs', 'belongs to', 'ownership', 'jv', 'joint venture', 'stake', 'equity', 'partnership', 'parent'],
      response: `**DIMTS Ownership Structure:**

DIMTS is a 50:50 joint venture between:

1️⃣ **Government of NCT of Delhi (GNCTD)** - 50% equity
2️⃣ **IDFC Foundation** - 50% equity

Both partners jointly govern the company through a Board of Directors with equal representation from both organizations.`
    },

    contact: {
      keywords: ['contact', 'phone', 'email', 'address', 'location', 'office', 'reach', 'call', 'where is'],
      response: `**📞 Contact DIMTS:**

**Corporate Office:**
8th Floor, Block-1, Delhi Technology Park
Shastri Park, Delhi-110053, India

**Phone:** +91 11 43090100
**Website:** www.dimts.in
**Bus Tracking:** businfo.dimts.in/businfo/

**CEO:** Rakesh Jain

For tenders: Visit www.dimts.in/Tenders.aspx
For careers: Visit www.dimts.in/Careers`
    },

    services: {
      keywords: ['service', 'what do', 'offer', 'provide', 'solution', 'work', 'do you do', 'specialize'],
      response: `**🚀 DIMTS Core Services:**

**1. Bus Operations & Management**
• Cluster bus scheme operations
• BRT corridor management
• Electric bus deployment
• Feeder services to Delhi Metro
• Fleet management & real-time monitoring

**2. Transport Technologies**
• Intelligent Transport Systems (ITS)
• GPS/GPRS vehicle tracking
• Smart ticketing & fare collection
• Traffic management systems
• Parking solutions & command centers

**3. Consultancy Services**
• Transport planning & DPR preparation
• Metro & RRTS planning
• Project Management Consultancy (PMC)
• PPP advisory & feasibility studies
• Road safety audits

We serve clients across India and international markets including Ethiopia.`
    },

    bus: {
      keywords: ['bus', 'cluster', 'route', 'fleet', 'brt', 'public transport', 'feeder', 'tracking'],
      response: `**🚌 Bus Services:**

**Operations:**
• Modern cluster bus scheme in Delhi
• BRT (Bus Rapid Transit) corridors
• Feeder services to Delhi Metro
• Air-conditioned buses on multiple routes

**Technology:**
• Real-time GPS tracking
• Live bus info at: **businfo.dimts.in/businfo/**
• Delhi Transit Bus Info mobile app
• Electronic fare collection

**Electric Buses:**
• Large-scale e-bus deployments (1000+ buses)
• Charging infrastructure planning
• Fleet optimization & monitoring

**Track Your Bus:** Visit businfo.dimts.in/businfo/`
    },

    electric: {
      keywords: ['electric', 'e-bus', 'ev', 'electric vehicle', 'charging', 'battery', 'green', 'sustainable'],
      response: `**⚡ Electric Bus Services:**

**Planning & Deployment:**
• Technical specifications for e-buses
• Fleet sizing & route optimization
• Tender management & procurement
• Performance monitoring

**Infrastructure:**
• Charging station design
• Depot electrification
• Power infrastructure planning
• Grid integration

**Achievements:**
• 1000+ electric buses deployed in Delhi
• Comprehensive charging infrastructure
• Leading India's e-mobility transformation
• Significant reduction in urban emissions

DIMTS is a pioneer in electric bus operations in India!`
    },

    projects: {
      keywords: ['project', 'work done', 'portfolio', 'completed', 'achievement', 'case study'],
      response: `**🏗️ Major Projects:**

**Electric Mobility:**
• 1000+ e-buses in Delhi with charging infrastructure

**International:**
• Addis Ababa, Ethiopia - Electronic ticketing system

**Metro & Rail:**
• RRTS DPR: Panipat-Sonepat-Delhi (111 km)
• RRTS DPR: Meerut-Ghaziabad-Delhi (92 km)
• Bengaluru Airport Rail Link feasibility

**BRT & Bus:**
• Delhi BRT corridor development (7 corridors)
• 5,500+ bus stops integration
• Gurugram bus service operations

**Infrastructure:**
• Multi-level parking facilities
• Highway development projects
• Traffic management systems

**Stats:** 200+ projects completed across India & international markets`
    },

    technology: {
      keywords: ['technology', 'tech', 'its', 'intelligent', 'tracking', 'gps', 'app', 'software', 'digital', 'smart'],
      response: `**💻 Technology Solutions:**

**Intelligent Transport Systems:**
• Centralized Traffic Management
• Adaptive traffic signal control
• Real-time monitoring & analytics
• ANPR & enforcement systems

**Fleet Technology:**
• GPS/GPRS vehicle tracking
• Driver behavior monitoring
• Fuel efficiency optimization
• Automated maintenance scheduling

**Smart Ticketing:**
• Automated Fare Collection (AFCS)
• Contactless smart cards
• Mobile ticketing & QR codes
• Digital payment integration

**Mobile Apps:**
• Delhi Transit Bus Info (live tracking)
• TellTail Security App (emergency alerts)

**Command Centers:**
• Real-time dashboards
• Incident management
• Decision support systems`
    },

    consultancy: {
      keywords: ['consultancy', 'consulting', 'advisory', 'dpr', 'feasibility', 'planning', 'pmc'],
      response: `**📊 Consultancy Services:**

**Transport Planning:**
• Comprehensive Mobility Plans
• Traffic & transportation studies
• Multi-modal integration planning
• Demand forecasting

**DPR Preparation:**
• Metro & RRTS systems
• BRT corridors
• Bus terminals & depots
• Parking facilities
• Highway projects

**Project Management (PMC):**
• Construction supervision
• Quality assurance
• Contract management
• Commissioning support

**Engineering Design:**
• Highway & road design
• Bridge & flyover design
• Structural engineering
• Depot planning

**PPP Advisory:**
• Financial modeling
• Viability analysis
• Transaction advisory
• Risk assessment

**Specialized:**
• Road safety audits
• Smart city solutions
• Operations planning`
    },

    career: {
      keywords: ['career', 'job', 'vacancy', 'hiring', 'recruitment', 'internship', 'employment', 'work with', 'apply', 'opening'],
      response: `**💼 Careers at DIMTS:**

**We're Hiring in:**
• Transport Planning & Engineering
• IT & Software Development
• Civil & Structural Engineering
• Traffic Engineering
• Project Management
• Operations Management
• GIS & Remote Sensing

**Employee Strength:** 501-1,000 employees

**We Offer:**
✓ Work on cutting-edge transport projects
✓ Professional development opportunities
✓ Competitive compensation
✓ National & international project exposure

**Internships Available** for engineering, planning, and management students

**Apply Now:**
Visit: **www.dimts.in** → Careers section

Check current openings and apply online with your resume!`
    },

    tender: {
      keywords: ['tender', 'rfp', 'bid', 'procurement', 'proposal', 'contract'],
      response: `**📋 Tenders & Procurement:**

**Tender Types:**
• Consultancy services
• Technology solutions
• Infrastructure projects
• Operations contracts

**Process:**
1. Notification on website
2. Pre-bid meeting
3. Online bid submission
4. Evaluation & award

**Important Info:**
• All tender documents available for download
• EMD/Bid Security required
• Regular website monitoring essential

**Access Tenders:**
🔗 **www.dimts.in/Tenders.aspx**

📞 For queries: +91 11 43090100

Stay updated by checking our website regularly!`
    },

    metro: {
      keywords: ['metro', 'rail', 'train', 'rrts', 'rapid rail', 'railway', 'subway'],
      response: `**🚇 Metro & Rail Services:**

**Feeder Services:**
• Last-mile connectivity to Delhi Metro
• Integrated ticketing
• Synchronized schedules
• Modern AC buses

**Metro Consultancy:**
• Planning & feasibility studies
• DPR preparation
• Station design & architecture
• Systems integration
• Multi-modal connectivity

**Major RRTS Projects:**
• Panipat-Sonepat-Delhi (111 km)
• Meerut-Ghaziabad-Delhi (92 km)

**Airport Links:**
• Bengaluru Airport Rail Link DPR

**Expertise:**
• Alignment planning
• Demand forecasting
• Technical specifications
• Financial modeling
• Project management

Contributed to metro projects in Delhi, Bengaluru & other cities!`
    },

    traffic: {
      keywords: ['traffic', 'signal', 'congestion', 'jam', 'itms', 'traffic management'],
      response: `**🚦 Traffic Management:**

**Intelligent Systems (ITMS):**
• AI-based signal optimization
• Real-time traffic monitoring
• Adaptive traffic control
• Automated incident detection

**Command & Control:**
• Centralized traffic management
• Live dashboards & analytics
• Emergency response coordination
• Integration with enforcement

**Enforcement:**
• Red light violation detection
• Speed monitoring (ANPR)
• Automated challan generation

**Benefits:**
✓ 20-30% reduced travel time
✓ Lower fuel consumption
✓ Reduced emissions
✓ Improved road safety
✓ Data-driven decisions

**Technology:** Advanced cameras, sensors, AI/ML algorithms, fiber optic networks

Successfully implemented in multiple cities!`
    },

    parking: {
      keywords: ['parking', 'park', 'multi level', 'automated parking', 'mlp'],
      response: `**🅿️ Parking Solutions:**

**Smart Parking:**
• Real-time space availability
• Mobile app integration
• Cashless payments
• Automated entry/exit
• Parking guidance system

**Multi-Level Parking (MLP):**
• Planning & design
• Structural engineering
• Construction management (PMC)
• Steel/RCC structures
• Underground & rooftop parking

**Automated Systems:**
• Robotic parking
• Vertical parking towers
• 60% more capacity
• Enhanced security

**Services:**
• Parking demand studies
• Operations management
• Revenue optimization
• Dynamic pricing

Thousands of parking spaces added across Delhi-NCR!`
    },

    safety: {
      keywords: ['safety', 'security', 'emergency', 'telltail', 'road safety'],
      response: `**🛡️ Safety & Security:**

**TellTail Security App:**
• Emergency alert system
• GPS location sharing
• Panic button
• Quick response
• Available on iOS & Android

**Bus Safety:**
• CCTV in all buses
• GPS tracking
• Real-time monitoring
• Driver background verification
• Speed governors

**Road Safety:**
• Safety audits (pre & post-construction)
• Black spot identification
• Accident analysis
• Awareness campaigns
• School safety programs

**Infrastructure:**
• Safe geometric design
• Pedestrian-friendly features
• Proper lighting & signage
• Crash barriers

Your safety is our priority!`
    },

    csr: {
      keywords: ['csr', 'social responsibility', 'community', 'sustainability', 'environment'],
      response: `**🌱 CSR & Sustainability:**

**Environmental Impact:**
• 1000+ electric buses reducing emissions
• Promoting sustainable transport
• Green mobility solutions
• Energy-efficient infrastructure

**Community Initiatives:**
• Road safety awareness campaigns
• School education programs
• Public transport accessibility
• Employment generation (500+ employees)

**Social Responsibility:**
• Improving urban mobility for millions
• Accessible public transport
• Community development
• Capacity building programs

DIMTS is committed to creating sustainable, accessible, and environment-friendly urban transport!`
    }
  };

  // Enhanced intent detection
  const findBestMatch = (question) => {
    const q = question.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const [topic, data] of Object.entries(knowledge)) {
      let score = 0;
      
      for (const keyword of data.keywords) {
        if (q.includes(keyword)) {
          score += keyword.split(' ').length * 10;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = topic;
      }
    }

    return bestMatch;
  };

  // Quick suggestions
  const quickSuggestions = [
    "What services do you offer?",
    "How can I contact DIMTS?",
    "Tell me about electric buses",
    "Show me career opportunities",
    "What are your major projects?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSubmit(suggestion);
  };

  const handleSubmit = async (messageText = null) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const matchedTopic = findBestMatch(text);
    
    let response;
    if (matchedTopic) {
      response = knowledge[matchedTopic].response;
    } else {
      response = `I'm not sure about that specific question. Here's what I can help you with:

• **Services** - Bus operations, ITS, consultancy
• **Contact** - Office address, phone, email
• **Projects** - Major completed and ongoing work
• **Electric Buses** - E-mobility initiatives
• **Technology** - ITS, GPS tracking, smart systems
• **Careers** - Job openings and opportunities
• **Tenders** - Procurement information

Try asking about any of these topics!

📞 For immediate assistance: +91 11 43090100
🌐 Visit: www.dimts.in`;
    }

    setIsTyping(false);
    const assistantMessage = { role: 'assistant', content: response };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-full max-w-4xl h-[90vh]'
      }`}>
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">DIMTS Smart Assistant</h1>
              <p className="text-xs text-blue-100">Powered by Smart Knowledge Base</p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </button>
        </div>

        {!isMinimized && (
          <>
            <div className="h-[calc(90vh-200px)] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <Bot className="text-blue-600" size={20} />
                    </div>
                  )}
                  <div className={`max-w-[75%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="bg-blue-600 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <User className="text-white" size={20} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                    <Bot className="text-blue-600" size={20} />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium px-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full transition border border-blue-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about DIMTS..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Intelligent keyword-based responses • No API required
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DIMTSChatbot;
