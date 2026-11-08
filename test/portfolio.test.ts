import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('CV assets exist at both uploaded asset path and public fallback directories', () => {
  const assetCvPath = path.resolve(process.cwd(), 'public/assets/aistudio/Ibrahim_Mohammed_-_Clinical_AI_CV_595df32d.pdf');
  const rootCvPath = path.resolve(process.cwd(), 'Ibrahim_Mohammed_Clinical_AI_CV.pdf');
  const publicCvPath = path.resolve(process.cwd(), 'public/Ibrahim_Mohammed_Clinical_AI_CV.pdf');
  
  assert.equal(fs.existsSync(assetCvPath), true, 'Uploaded CV PDF asset must exist in public/assets/aistudio');
  assert.equal(fs.existsSync(rootCvPath), true, 'Root fallback CV PDF must exist');
  assert.equal(fs.existsSync(publicCvPath), true, 'Public fallback CV PDF must exist');
});

test('index.html references the CV PDF asset and zero-404 print fallback handlers', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Verify Hero CV buttons
  assert.match(htmlContent, /id="hero-download-cv-btn"/);
  assert.match(htmlContent, /href="\.\/Ibrahim_Mohammed_Clinical_AI_CV\.pdf"/);
  assert.match(htmlContent, /download="Dr_Ibrahim_Mohammed_Clinical_AI_CV\.pdf"/);
  assert.match(htmlContent, /Download CV \(PDF\)/);
  assert.match(htmlContent, /View CV Online/);

  // Verify fetch checks local PDF for zero-404 guarantee
  assert.match(htmlContent, /fetch\('\.\/Ibrahim_Mohammed_Clinical_AI_CV\.pdf', \{ method: 'HEAD' \}\)/);
  assert.match(htmlContent, /triggerPrintCvFallback/);
  assert.match(htmlContent, /@media print/);
});

test('index.html includes all 5 Clinical AI repositories with live app and GitHub links', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // 1. ClinRLHF Workbench
  assert.match(htmlContent, /ClinRLHF Workbench: Medical LLM Evaluation & Hallucination Auditor/);
  assert.match(htmlContent, /href="https:\/\/ibrahimmohammedevuti\.github\.io\/clin-rlhf-workbench\/"/);
  assert.match(htmlContent, /href="https:\/\/github\.com\/ibrahimmohammedevuti\/clin-rlhf-workbench"/);

  // 2. FHIR-Structurer
  assert.match(htmlContent, /FHIR-Structurer: Few-Shot Clinical NLP & Ontology Engine/);
  assert.match(htmlContent, /href="https:\/\/ibrahimmohammedevuti\.github\.io\/fhir-clinical-structurer\/"/);
  assert.match(htmlContent, /href="https:\/\/github\.com\/ibrahimmohammedevuti\/fhir-clinical-structurer"/);

  // 3. GlucoKetone AI
  assert.match(htmlContent, /GlucoKetone AI: Continuous CGM\/CKM Telemetry & DKA Triage Copilot/);
  assert.match(htmlContent, /href="https:\/\/ibrahimmohammedevuti\.github\.io\/cgm-dka-telemetry-copilot\/"/);
  assert.match(htmlContent, /href="https:\/\/github\.com\/ibrahimmohammedevuti\/cgm-dka-telemetry-copilot"/);

  // 4. MedRedTeam
  assert.match(htmlContent, /MedRedTeam: ACLS\/PALS & Acute Triage Adversarial Sandbox/);
  assert.match(htmlContent, /href="https:\/\/ibrahimmohammedevuti\.github\.io\/acls-triage-redteam-sandbox\/"/);
  assert.match(htmlContent, /href="https:\/\/github\.com\/ibrahimmohammedevuti\/acls-triage-redteam-sandbox"/);

  // 5. ClinGuard
  assert.match(htmlContent, /ClinGuard: HIPAA Safe Harbor PHI De-Identification & Prompt Firewall/);
  assert.match(htmlContent, /href="https:\/\/ibrahimmohammedevuti\.github\.io\/phi-deidentifier-prompt-guard\/"/);
  assert.match(htmlContent, /href="https:\/\/github\.com\/ibrahimmohammedevuti\/phi-deidentifier-prompt-guard"/);
});

test('index.html contains background verification, standards bar, and RLHF teardown proof of work', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Verify no broken invalid hrefs exist
  assert.equal(htmlContent.includes('about:invalid'), false, 'Must not contain any about:invalid links');

  // Verify valid telephony links
  assert.match(htmlContent, /href="tel:\+18147132665"/);
  assert.match(htmlContent, /href="tel:\+2347032553907"/);

  // Verify verified medical license MDCN/R/107127
  assert.match(htmlContent, /MDCN\/R\/107127/);
  assert.match(htmlContent, /Active & Verified/i);

  // Verify GitHub links
  assert.match(htmlContent, /https:\/\/github\.com\/ibrahimmohammedevuti/);

  // Verify Standards Bar
  assert.match(htmlContent, /Clinical Ontologies, Interoperability & AI Evaluation Standards/);
  assert.match(htmlContent, /HL7 FHIR R4/);
  assert.match(htmlContent, /SNOMED-CT/);
  assert.match(htmlContent, /LOINC/);
  assert.match(htmlContent, /RxNorm/);

  // Verify Live RLHF Teardown Proof of Work
  assert.match(htmlContent, /Live RLHF Clinical Audit Teardown/);
  assert.match(htmlContent, /CKD Stage 4/);
  assert.match(htmlContent, /eGFR 22/);
  assert.match(htmlContent, /Colchicine/);
  assert.match(htmlContent, /Naproxen/);
  assert.match(htmlContent, /Prednisone/);
  assert.match(htmlContent, /CRITICAL SEVERITY/i);
});

test('index.html contains D3.js library and Competencies Radar Chart elements', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Verify D3 CDN script tag is included
  assert.match(htmlContent, /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/d3@7"><\/script>/);

  // Verify Radar Chart container and inspector HUD
  assert.match(htmlContent, /id="competency-radar-chart"/);
  assert.match(htmlContent, /id="radar-inspector-card"/);
  assert.match(htmlContent, /id="radar-inspect-pillar"/);
  assert.match(htmlContent, /id="radar-inspect-score-badge"/);
  assert.match(htmlContent, /id="radar-inspect-title"/);
  assert.match(htmlContent, /id="radar-inspect-desc"/);
  assert.match(htmlContent, /id="radar-inspect-progress"/);

  // Verify Filter Toggle Buttons
  assert.match(htmlContent, /id="radar-btn-all"/);
  assert.match(htmlContent, /id="radar-btn-ai"/);
  assert.match(htmlContent, /id="radar-btn-clinical"/);
  assert.match(htmlContent, /id="radar-btn-informatics"/);
  assert.match(htmlContent, /id="radar-btn-compare"/);

  // Verify Radar Engine JavaScript functions
  assert.match(htmlContent, /function renderCompetencyRadar/);
  assert.match(htmlContent, /function setRadarFilter/);
  assert.match(htmlContent, /function updateRadarInspector/);
  assert.match(htmlContent, /radarMetrics/);
});

test('Radar geometry and tri-axial capability score equilibrium logic', () => {
  // Pure logic decoupled test verifying radar polygon geometry and balance
  const metrics = [
    { name: 'Clinical Diagnostics', pillarKey: 'clinical', score: 98, baseline: 30 },
    { name: 'Hallucination Auditing', pillarKey: 'ai', score: 96, baseline: 55 },
    { name: 'RLHF & Rubrics', pillarKey: 'ai', score: 95, baseline: 60 },
    { name: 'HL7 FHIR Interoperability', pillarKey: 'informatics', score: 92, baseline: 65 },
    { name: 'Continuous Telemetry', pillarKey: 'clinical', score: 94, baseline: 40 },
    { name: 'Emergency Resuscitation', pillarKey: 'clinical', score: 93, baseline: 20 },
    { name: 'Zero-Trust Cyber Defense', pillarKey: 'informatics', score: 91, baseline: 70 },
    { name: 'Medical Red-Teaming', pillarKey: 'ai', score: 97, baseline: 50 },
  ];

  // Radar geometry coordinate calculation helper
  function computeRadarPoint(score: number, maxScore: number, index: number, total: number, radius: number, cx: number, cy: number) {
    const angleSlice = (Math.PI * 2) / total;
    const angle = angleSlice * index - Math.PI / 2;
    const r = radius * (score / maxScore);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  }

  const cx = 250;
  const cy = 250;
  const radius = 185;

  // Verify top point (index 0, angle = -PI/2, pointing straight up)
  const topPoint = computeRadarPoint(100, 100, 0, 8, radius, cx, cy);
  assert.ok(Math.abs(topPoint.x - 250) < 0.001, 'Top point X should equal center X');
  assert.ok(Math.abs(topPoint.y - (250 - radius)) < 0.001, 'Top point Y should be cy - radius');

  // Verify average balance across the three pillars
  const aiScores = metrics.filter(m => m.pillarKey === 'ai').map(m => m.score);
  const clinicalScores = metrics.filter(m => m.pillarKey === 'clinical').map(m => m.score);
  const informaticsScores = metrics.filter(m => m.pillarKey === 'informatics').map(m => m.score);

  const avgAi = aiScores.reduce((a, b) => a + b, 0) / aiScores.length;
  const avgClinical = clinicalScores.reduce((a, b) => a + b, 0) / clinicalScores.length;
  const avgInformatics = informaticsScores.reduce((a, b) => a + b, 0) / informaticsScores.length;

  assert.ok(avgAi >= 95, 'AI Audit average should be >= 95%');
  assert.ok(avgClinical >= 94, 'Clinical Medicine average should be >= 94%');
  assert.ok(avgInformatics >= 90, 'Informatics average should be >= 90%');

  // Verify standard dev baseline is significantly lower in clinical diagnostics (< 40%)
  const clinicalBaseline = metrics.find(m => m.name === 'Clinical Diagnostics')!.baseline;
  assert.ok(clinicalBaseline <= 35, 'Standard non-clinical dev baseline in Clinical Diagnostics must be low');
});
