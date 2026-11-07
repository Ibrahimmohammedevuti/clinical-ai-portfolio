import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('CV asset exists and is accessible', () => {
  const cvPath = path.resolve(process.cwd(), 'public/assets/aistudio/Ibrahim_Mohammed_-_Clinical_and_Health_Informatics_AI_Resume_d47b0aec.pdf');
  assert.equal(fs.existsSync(cvPath), true, 'Resume PDF file must exist in public assets');
});

test('index.html contains all required sections and critical metadata', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Verify Hero details
  assert.match(htmlContent, /Ibrahim Mohammed/);
  assert.match(htmlContent, /General Practitioner/);
  assert.match(htmlContent, /Health Informatics Lead/);
  assert.match(htmlContent, /Clinical AI & Model Evaluation Specialist/);
  assert.match(htmlContent, /ibrahimmohammedevuti@gmail\.com/);
  assert.match(htmlContent, /Warri, Delta State, Nigeria/);

  // Verify Core Competencies
  assert.match(htmlContent, /AI Auditing & Clinical Evaluation/);
  assert.match(htmlContent, /Clinical Medicine & Public Health/);
  assert.match(htmlContent, /Health Informatics & Security/);

  // Verify 3 Case Studies
  assert.match(htmlContent, /Real-Time Diabetes Telemetry & EHR Integration/);
  assert.match(htmlContent, /Clinical AI Hallucination & Factuality Auditing/);
  assert.match(htmlContent, /Automated Healthcare Access & Audit Logging/);

  // Verify Experience
  assert.match(htmlContent, /Emeis Care/);
  assert.match(htmlContent, /White Royal Clinic/);

  // Verify Education & Certifications
  assert.match(htmlContent, /Boston University/);
  assert.match(htmlContent, /Derby University/);
  assert.match(htmlContent, /University of the People/);
  assert.match(htmlContent, /CEH/);
  assert.match(htmlContent, /ACLS/);
  assert.match(htmlContent, /PMP/);
});
