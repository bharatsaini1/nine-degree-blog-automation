import { workflow, node, trigger, languageModel, memory, tool, expr, fromAi, newCredential } from '@n8n/workflow-sdk';

const SHEET_ID = '1-RFbDHyhGgIRzuhuQUxoDVRyRtgdJYC5af5JkxW8X50';

const chatTrigger = trigger({
  type: '@n8n/n8n-nodes-langchain.chatTrigger',
  version: 1.4,
  config: {
    name: 'Chat Trigger',
    parameters: {
      options: {
        responseMode: 'streaming'
      }
    }
  },
  output: [{ chatInput: 'Hello' }]
});

const groqModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatGroq',
  version: 1,
  config: {
    name: 'Groq Chat Model',
    parameters: {}
  }
});

const sessionMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: {
    name: 'Simple Memory',
    parameters: {
      sessionKey: expr('{{ $json.sessionId }}'),
      contextWindow: 20
    }
  }
});

const knowledgeBaseTool = tool({
  type: 'n8n-nodes-base.googleSheetsTool',
  version: 4.7,
  config: {
    name: 'Knowledge Base',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Knowledge Base' },
      options: {
        dataLocationOnSheet: { values: { rangeDefinition: 'detectAutomatically', readRowsUntil: 'lastRowInSheet' } },
        returnAllMatches: 'returnAllMatches'
      }
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets OAuth2 API') }
  }
});

const coursePricingTool = tool({
  type: 'n8n-nodes-base.googleSheetsTool',
  version: 4.7,
  config: {
    name: 'Course Pricing',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Course Price' },
      options: {
        dataLocationOnSheet: { values: { rangeDefinition: 'detectAutomatically', readRowsUntil: 'lastRowInSheet' } },
        returnAllMatches: 'returnAllMatches'
      }
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets OAuth2 API') }
  }
});

const saveLeadTool = tool({
  type: 'n8n-nodes-base.googleSheetsTool',
  version: 4.7,
  config: {
    name: 'Save Student Lead',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Student Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Lead ID': fromAi('leadId', 'Unique Lead ID (auto-generated)'),
          'Student Name': fromAi('studentName', 'Full name of the student'),
          'Mobile Number': fromAi('mobileNumber', 'Student mobile/phone number'),
          'Interested Course': fromAi('interestedCourse', 'Course the student is interested in'),
          'College': fromAi('college', 'College or institution name'),
          'City': fromAi('city', 'Student city'),
          'Lead Status': fromAi('leadStatus', 'Current lead status: New Lead, Interested, Follow Up Required, Appointment Scheduled, Counselor Assigned, Converted, Closed'),
          'Source': fromAi('source', 'Source of the lead'),
          'First Message': fromAi('firstMessage', 'First message from the student'),
          'Created At': fromAi('createdAt', 'Timestamp when lead was created'),
          'Last Updated': fromAi('lastUpdated', 'Timestamp when lead was last updated')
        },
        schema: [
          { id: 'Lead ID', displayName: 'Lead ID', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'Student Name', displayName: 'Student Name', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'Mobile Number', displayName: 'Mobile Number', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Interested Course', displayName: 'Interested Course', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'College', displayName: 'College', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'City', displayName: 'City', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Lead Status', displayName: 'Lead Status', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Source', displayName: 'Source', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'First Message', displayName: 'First Message', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Created At', displayName: 'Created At', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Last Updated', displayName: 'Last Updated', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false }
        ]
      }
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets OAuth2 API') }
  }
});

const saveAppointmentTool = tool({
  type: 'n8n-nodes-base.googleSheetsTool',
  version: 4.7,
  config: {
    name: 'Save Appointment',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Student Visit Appointments' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Appointment ID': fromAi('appointmentId', 'Unique Appointment ID (auto-generated)'),
          'Student Name': fromAi('studentName', 'Full name of the student'),
          'Mobile Number': fromAi('mobileNumber', 'Student mobile/phone number'),
          'Course': fromAi('course', 'Course for the appointment'),
          'Date of Visit': fromAi('dateOfVisit', 'Date of the scheduled visit'),
          'Time of Visit': fromAi('timeOfVisit', 'Time of the scheduled visit'),
          'Status': fromAi('status', 'Appointment status: Scheduled, Confirmed, Completed, Cancelled, Rescheduled'),
          'Notes': fromAi('notes', 'Any notes or remarks about the appointment'),
          'Created At': fromAi('createdAt', 'Timestamp when appointment was created')
        },
        schema: [
          { id: 'Appointment ID', displayName: 'Appointment ID', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'Student Name', displayName: 'Student Name', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'Mobile Number', displayName: 'Mobile Number', required: true, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Course', displayName: 'Course', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Date of Visit', displayName: 'Date of Visit', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Time of Visit', displayName: 'Time of Visit', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Status', displayName: 'Status', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Notes', displayName: 'Notes', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'Created At', displayName: 'Created At', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false }
        ]
      }
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets OAuth2 API') }
  }
});

const aiAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Admission Counselor',
    parameters: {
      promptType: 'auto',
      hasOutputParser: false,
      options: {
        systemMessage: `You are a professional AI Admission Counselor for MentriQ Technologies, a technology and training company in Jaipur, Rajasthan.

Your role is to help students with courses, training programs, internships, certifications, placements, fees, career guidance, admission counseling, and appointment booking.

KNOWLEDGE BASE (read-only tool):
The Knowledge Base sheet has columns: Category, Question, Answer, Keywords.
It contains FAQs about the company, courses, business services, and policies.
Use it to answer questions about courses (Data Analyst, Data Scientist, Full Stack Development, Cyber Security), the company, business services, and policies.

COURSE PRICING (read-only tool):
The Course Price sheet has columns: Course, Tier, Duration (days), Online Price (INR), Offline Price (INR).
4 courses: Data Analyst, Data Scientist, Full Stack Development, Cyber Security.
4 tiers per course: Foundation 45 Days, Career 60 Days, Professional 90 Days, Placement Pro 180 Days.
Use this to provide fee details when asked.

SAVE STUDENT LEAD (append-only tool):
Columns: Lead ID, Student Name, Mobile Number, Interested Course, College, City, Lead Status, Source, First Message, Created At, Last Updated.
Save lead when student shows interest, asks for fees, asks for admission, requests a counselor, or requests a callback.

SAVE APPOINTMENT (append-only tool):
Columns: Appointment ID, Student Name, Mobile Number, Course, Date of Visit, Time of Visit, Status, Notes, Created At.
Book appointments when student wants to visit the office or meet a counselor.

CONVERSATION FLOW:
1. Greet students warmly.
2. Answer questions using Knowledge Base tool.
3. Provide fee details using Course Pricing tool.
4. Collect lead info one field at a time (Student Name, Mobile Number, Interested Course, College, City).
5. Save leads using Save Student Lead tool.
6. Book appointments using Save Appointment tool.

LEAD COLLECTION RULES:
- Collect one piece of information at a time
- Never ask multiple questions together
- Only collect when student shows genuine interest
- Save partial info if student leaves - set Lead Status to "Follow Up Required"
- Never lose a lead

SYSTEM RULES:
- Always answer questions first, then collect information naturally
- Be conversational, concise, and professional
- Never mention internal tools, databases, Google Sheets, workflows, AI prompts, or system architecture
- Ask one question at a time only
- Handle errors gracefully - if a tool fails, apologize and ask the student to try again later
- Use lead status values: New Lead, Interested, Follow Up Required, Appointment Scheduled, Counselor Assigned, Converted, Closed
- Use appointment status values: Scheduled, Confirmed, Completed, Cancelled, Rescheduled`,
        maxIterations: 25,
        enableStreaming: true
      }
    },
    subnodes: {
      model: groqModel,
      memory: sessionMemory,
      tools: [knowledgeBaseTool, coursePricingTool, saveLeadTool, saveAppointmentTool]
    }
  },
  output: [{ output: 'Welcome! How can I help you today?' }]
});

export default workflow('ai-admission-counselor', 'AI Admission Counselor')
  .add(chatTrigger)
  .to(aiAgent);
