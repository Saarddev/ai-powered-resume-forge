
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateSummarizationPrompt(text: string) {
  return `
Convert the following text into clear, concise bullet points that highlight key achievements and skills. Make each point:
- Start with a strong action verb in past tense (e.g., Implemented, Developed, Led)
- Be concise and impactful (1 line each)
- Include specific achievements with measurable results (numbers, percentages)
- Focus on outcomes and value delivered
- Be ATS-friendly for resume scanning

Original text:
${text}

Return ONLY a clean list of 2-3 bullet points, each starting with "• " (bullet symbol followed by a space), with one bullet point per line. 
Do not include any other text, explanations, or formatting in your response. Just the bullet points.`;
}

function generateSummaryPrompt(experience: string[], skills: string[], preserveUserContent = false) {
  return `
As an expert resume writer, create a  short (80 words) professional summary that will stand out on an ATS-scanned resume. Focus on:

1. The candidate's key strengths, experiences, and unique value proposition
2. Their specific technical abilities and domain expertise
3. Quantifiable achievements and career progression
4. Industry-relevant keywords for ATS optimization
5. A warm, engaging tone that reflects the candidate's personality
6. Short sentences, active voice, and varied sentence structure

Current experience context:
${experience ? experience.join('\n') : 'Not provided'}

Skills highlight:
${skills ? skills.join(', ') : 'Not provided'}

${preserveUserContent ? "IMPORTANT: Use ONLY information from the provided experience and skills. DO NOT invent new details, roles, or achievements not mentioned in the input. Stick closely to the facts present in the provided experience." : ""}

Write a concise, powerful short summary that positions the candidate as a high-value professional.
Format the summary as 3-4 bullet points, each starting with "• " (bullet symbol followed by a space).
Each bullet should start with a strong action verb or adjective.

Return only the bullet-formatted summary text.`;
}

function generateSkillsPrompt(experience: string[], preserveUserContent = false) {
  return `
Extract technical and soft skills from the following experience, focusing on ATS-friendly terms:

${experience ? experience.join('\n') : 'Not provided'}

${preserveUserContent ? "IMPORTANT: Only extract skills that are ACTUALLY MENTIONED in the experience provided. Do not invent skills or include generic skills that aren't clearly indicated in the text." : ""}

Return as JSON in this format - be specific and include skills that reveal both professional expertise and personal strengths:
{
  "technical": ["skill1", "skill2"],
  "soft": ["skill1", "skill2"]
}

For technical skills, focus on specific technologies, tools, and methodologies.
For soft skills, identify transferable abilities like leadership, communication, and problem-solving.
Limit to 8-12 most relevant technical skills and 5-8 most important soft skills that appear in the text.`;
}

function generateImprovementPrompt(description: string, preserveUserContent = false) {
  return `
Transform this resume description into impactful bullet points following these guidelines:

1. Start each bullet with a strong action verb (e.g., Led, Developed, Implemented)
2. Focus on accomplishments, not just responsibilities
3. Include metrics and quantifiable results when possible
4. Highlight specific technologies and methodologies used
5. Ensure each bullet is ATS-friendly and keyword optimized

Original description:
${description || 'Not provided'}

${preserveUserContent ? "IMPORTANT: Maintain the original meaning and core content of the description. Enhance and restructure but DO NOT add fictional achievements, technologies, or responsibilities that weren't in the original text." : ""}

Format the output as 2-3 bullet points, each starting with "• " (bullet symbol followed by a space).
Focus on quality over quantity - each bullet should demonstrate clear value and impact.

Return only the formatted bullet points, with no additional text.`;
}

function generateExperiencePrompt(context: any = {}, preserveUserContent = false) {
  return `
Create powerful bullet points for this work experience that will stand out on an ATS-scanned resume:

Job Title: ${context?.title || 'Not specified'}
Company: ${context?.company || 'Not specified'}
Location: ${context?.location || 'Not specified'}
Duration: ${context?.startDate || 'Not specified'} to ${context?.endDate || 'Present'}

Current description (if any):
${context?.description || ''}

${preserveUserContent ? "IMPORTANT: Enhance what's already provided but DO NOT add fabricated achievements or responsibilities. Stick to the information that can be reasonably inferred from the original text." : ""}

Create 2-3 bullet points that:
1. Start each bullet with a strong action verb in past tense
2. Include specific achievements with quantifiable results (%, $, numbers) where appropriate
3. Highlight technologies, methodologies, and tools used that are mentioned in the original text
4. Demonstrate problem-solving abilities and business impact
5. Incorporate keywords relevant to the job title and industry
6. Keep each bullet to 1-2 concise lines

Return only the bullet points, with each point starting with "• " (bullet symbol followed by a space).
Each point should be on its own line with no other text or formatting.`;
}

function generateFullResumePrompt(linkedinData: any, template: string = 'modern') {
  // Ensure linkedinData is valid
  if (!linkedinData) {
    linkedinData = {};
  }
  
  return `
You are creating a natural-sounding, professional resume that feels genuinely human.

Requirements:
1. Use warm, conversational language
2. Include specific achievements and metrics
3. Focus on impact and value rather than just responsibilities
4. Balance professionalism with personality
5. Avoid generic corporate language
6. Highlight relevant skills that tell a story
7. Use short sentences, active voice, and varied sentence structure

LinkedIn Data:
${JSON.stringify(linkedinData, null, 2)}

Return only a valid JSON resume with the following structure:
{
  "personal": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "summary": "",
  "experience": [
    {
      "id": "exp1",
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "education": [
    {
      "id": "edu1",
      "institution": "",
      "degree": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": []
  },
  "languages": [],
  "certifications": [],
  "projects": []
}`;
}

function generateEducationPrompt(type: string, context: any = {}, preserveUserContent = false) {
  const field = type.replace('education-', '');
  
  switch (field) {
    case 'degree':
      return `Generate an academic degree name based on this context:
- Institution: ${context?.institution || 'Not specified'}
- Field: ${context?.field || 'Not specified'}
- Level: ${context?.level || "Bachelor's"}

${preserveUserContent ? "IMPORTANT: If specific degree information is provided, format it professionally but do not change it substantially." : ""}

Requirements:
1. Be specific and formal
2. Use standard degree nomenclature
3. Include concentration if relevant
4. Be concise but complete

Return only the degree name.`;

    case 'institution':
      return `Suggest a prestigious educational institution name based on this context:
- Degree: ${context?.degree || 'Not specified'}
- Location: ${context?.location || 'Not specified'}
- Field: ${context?.field || 'Not specified'}

${preserveUserContent ? "IMPORTANT: If an institution name is already provided, return it with proper formatting but don't change it to a different institution." : ""}

Requirements:
1. Use the official institution name
2. Be accurate and specific
3. Include location if part of the name
4. Focus on well-known institutions

Return only the institution name.`;

    case 'description':
      return `Write a warm, personal academic description based on this educational experience:
- Degree: ${context?.degree || 'Not specified'}
- Institution: ${context?.institution || 'Not specified'}
- Field: ${context?.field || 'Not specified'}

${preserveUserContent ? "IMPORTANT: If a description is already provided, enhance its format and clarity but preserve the core information and achievements mentioned." : ""}

Create a description that:
1. Highlights key achievements in a natural way
2. Mentions relevant coursework that shows passion or interest
3. Includes honors or awards with personal context
4. Adds a touch of personality to the academic experience
5. Is specific but conversational
6. Keeps to 2-3 lines while remaining engaging
7. Shows the human behind the degree

Return only the description.`;

    case 'dates':
      return `Generate education dates based on:
- Degree Level: ${context?.degree || "Bachelor's"}
- Current Status: ${context?.status || 'Graduated'}

${preserveUserContent ? "IMPORTANT: If dates are already provided, maintain them with proper formatting." : ""}

Requirements:
1. Use MM YYYY format
2. Be realistic for the degree type
3. Consider typical duration
4. If recent, use current year

Return in format: "MM YYYY - MM YYYY"`;

    default:
      return "";
  }
}

function generateATSScanPrompt(text: string) {
  return `
You are an expert ATS (Applicant Tracking System) analyzer with deep knowledge of how modern ATS systems work.
Thoroughly analyze this resume content and provide a comprehensive ATS compatibility assessment:

${text}

Evaluate the resume based on the following criteria:
1. Keyword optimization
2. Formatting and structure
3. Use of action verbs
4. Quantifiable achievements
5. Technical skill representation
6. Overall ATS compatibility

Return your analysis as a JSON object with the following structure:
{
  "score": <number 0-100 representing overall ATS compatibility>,
  "metrics": [
    {"name": "Keyword Optimization", "score": <0-100>},
    {"name": "Formatting & Structure", "score": <0-100>},
    {"name": "Action Verbs Usage", "score": <0-100>},
    {"name": "Quantifiable Achievements", "score": <0-100>},
    {"name": "Technical Skills Representation", "score": <0-100>}
  ],
  "strengths": [<array of 2-4 specific strengths as strings>],
  "improvements": [<array of 2-4 specific areas for improvement as strings>],
  "keywords": [<array of 5-10 highly relevant keywords that should be included>]
}

Provide a legitimate, accurate score that represents the resume's true ATS compatibility. Be honest but constructive.`;
}

function parseGeminiResponse(response: any, type: string) {
  if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response format from Gemini API');
  }
  
  const text = response.candidates[0].content.parts[0].text;
  
  try {
    if (type === "ats-scan") {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in ATS scan response');
    }

    if (type === "experience-description") {
      // Ensure description is returned as bullet points
      let formattedDescription = text.trim();
      
      // If there are no bullet points in the response, format as bullet points
      if (!formattedDescription.includes('•') && !formattedDescription.includes('-')) {
        const sentences = formattedDescription
          .split(/[.!?]\s+/)
          .filter(line => line.trim().length > 0)
          .map(line => line.trim())
          .filter(line => line.length > 0);
        
        formattedDescription = sentences.map(line => `• ${line}`).join('\n');
      } else {
        // If bullet points exist but need formatting
        formattedDescription = formattedDescription
          .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0) // Remove empty lines
          .map(line => line.startsWith('•') ? line : `• ${line}`) // Ensure each line starts with a bullet
          .join('\n');
      }
      
      return { description: formattedDescription };
    }
    
    if (type.startsWith('education-')) {
      const field = type.replace('education-', '');
      if (field === 'dates') {
        const [startDate, endDate] = text.trim().split(' - ');
        return { startDate, endDate };
      }
      return { [field]: text.trim() };
    }
    
    if (type === "summary" || type === "improve") {
      // Format summary as bullet points
      let formattedSummary = text.trim();
      
      // If there are no bullet points in the response, format as bullet points
      if (!formattedSummary.includes('•') && !formattedSummary.includes('-')) {
        const sentences = formattedSummary
          .split(/[.!?]\s+/)
          .filter(line => line.trim().length > 0)
          .map(line => {
            // Ensure each bullet starts with an action verb
            let point = line.trim();
            if (!/^[A-Z][a-z]+ed|^[A-Z][a-z]+ing|^[A-Z][a-z]+s\b/.test(point)) {
              const actionVerbs = ['Developed', 'Implemented', 'Created', 'Led', 'Managed', 'Executed', 'Improved', 
                'Achieved', 'Increased', 'Reduced', 'Delivered', 'Designed', 'Established', 'Coordinated', 'Transformed'];
              const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
              point = `${randomVerb} ${point.charAt(0).toLowerCase() + point.slice(1)}`;
            }
            return point;
          })
          .filter(line => line.length > 0);
        
        formattedSummary = sentences.map(line => `• ${line}`).join('\n');
      } else {
        // If bullet points exist but need formatting
        formattedSummary = formattedSummary
          .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0) // Remove empty lines
          .map(line => {
            if (!line.startsWith('•')) {
              return `• ${line}`;
            }
            return line;
          }) // Ensure each line starts with a bullet
          .join('\n');
      }
      
      return { [type === "summary" ? "summary" : "improved"]: formattedSummary };
    }
    
    if (type === "summarize") {
      // Convert text to bullet points if it's not already
      let summary = text.trim();
      
      // If there are no bullet points in the response, format as bullet points
      if (!summary.includes('•') && !summary.includes('-')) {
        const sentences = summary
          .split(/[.!?]\s+/)
          .filter(line => line.trim().length > 0)
          .map(line => {
            // Ensure each bullet starts with an action verb
            let point = line.trim();
            if (!/^[A-Z][a-z]+ed|^[A-Z][a-z]+ing|^[A-Z][a-z]+s\b/.test(point)) {
              const actionVerbs = ['Developed', 'Implemented', 'Created', 'Led', 'Managed', 'Executed', 'Improved', 
                'Achieved', 'Increased', 'Reduced', 'Delivered', 'Designed', 'Established', 'Coordinated', 'Transformed'];
              const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
              point = `${randomVerb} ${point.charAt(0).toLowerCase() + point.slice(1)}`;
            }
            return point;
          })
          .filter(line => line.length > 0);
        
        summary = sentences.map(line => `• ${line}`).join('\n');
      } else {
        // If bullet points exist but need formatting
        summary = summary
          .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0) // Remove empty lines
          .map(line => {
            if (!line.startsWith('•')) {
              return `• ${line}`;
            }
            return line;
          }) // Ensure each line starts with a bullet
          .join('\n');
      }
      
      console.log('Formatted summary:', summary);
      return { summary };
    }
    
    if (type === "skills") {
      const skillsMatch = text.match(/\{[\s\S]*\}/);
      if (skillsMatch) {
        return JSON.parse(skillsMatch[0]);
      }
      throw new Error('No valid JSON found in skills response');
    }
    
    // For full resume enhancement
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResume = JSON.parse(jsonMatch[0]);
      
      // Ensure projects array exists
      if (!parsedResume.projects) {
        parsedResume.projects = [];
      }
      
      return { enhancedResume: parsedResume };
    }
    
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw new Error('Failed to parse the AI-generated data');
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set. Please configure your environment variables.");
    }

    const requestData = await req.json().catch(err => {
      throw new Error(`Invalid JSON in request body: ${err.message}`);
    });
    
    const { type, text, linkedinData, resumeTemplate, experience, skills, description, educationContext, experienceContext, preserveUserContent } = requestData;
    
    if (!type) {
      throw new Error("Missing 'type' parameter in request");
    }
    
    let prompt = "";
    let requestType = type || 'full-resume';
    
    if (type === "summarize") {
      if (!text) {
        throw new Error("Missing 'text' parameter for summarization");
      }
      prompt = generateSummarizationPrompt(text);
    } else if (type === "ats-scan") {
      if (!text) {
        throw new Error("Missing 'text' parameter for ATS scanning");
      }
      prompt = generateATSScanPrompt(text);
      console.log("Generating ATS scan with Gemini API");
    } else if (requestType.startsWith('education-')) {
      prompt = generateEducationPrompt(requestType, educationContext, preserveUserContent);
    } else if (requestType === "summary") {
      if (!Array.isArray(experience) || experience.length === 0) {
        throw new Error("Insufficient experience data for summary generation");
      }
      prompt = generateSummaryPrompt(experience, skills, preserveUserContent);
    } else if (requestType === "skills") {
      if (!Array.isArray(experience) || experience.length === 0) {
        throw new Error("Insufficient experience data for skills extraction");
      }
      prompt = generateSkillsPrompt(experience, preserveUserContent);
    } else if (requestType === "improve") {
      if (!description) {
        throw new Error("Missing 'description' parameter for improvement");
      }
      prompt = generateImprovementPrompt(description, preserveUserContent);
    } else if (requestType === "experience-description") {
      prompt = generateExperiencePrompt(experienceContext, preserveUserContent);
    } else {
      // Full resume enhancement
      if (!linkedinData) {
        throw new Error("Missing 'linkedinData' parameter for resume enhancement");
      }
      prompt = generateFullResumePrompt(linkedinData, resumeTemplate || "modern");
    }

    console.log(`Generating ${requestType} with Gemini API`);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API error: ${response.status} ${errorData}`);
      throw new Error(`Gemini API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const result = parseGeminiResponse(data, requestType);
    
    console.log(`Successfully generated ${requestType}`);
    
    if (type === "summarize") {
      return new Response(JSON.stringify({ summary: result.summary }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhance-resume function:', error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
