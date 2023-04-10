import fs from 'fs';
import path from 'path';

const hobby = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_hobby_result.json'), 'utf8'));
const speciality = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_speciality_result.json'), 'utf8'));
const interest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_interest_result.json'), 'utf8'));
const dream = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_dream_result.json'), 'utf8'));
const age = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_age_result.json'), 'utf8'));
const sexuality = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_sexuality_result.json'), 'utf8'));
const job = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_job_result.json'), 'utf8'));
const food = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_food_result.json'), 'utf8'));
const color = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_color_result.json'), 'utf8'));
const goal = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_goal_result.json'), 'utf8'));
const personality = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_personality_result.json'), 'utf8'));

export const titleObjs = {
  '취미': hobby,
  '특기': speciality,
  '관심사': interest,
  '꿈': dream,
  '나이': age,
  '성별': sexuality,
  '직업': job,
  '좋아하는 음식': food,
  '좋아하는 색깔': color,
  '목표': goal,
  '성격': personality,
}
