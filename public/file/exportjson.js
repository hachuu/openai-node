import fs from 'fs';
import path from 'path';

const shy = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_result.json'), 'utf8'));
const difficultyUnfamiliar = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_difficultyUnfamiliar_result.json'), 'utf8'));
const makingFriends = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_makingFriends_result.json'), 'utf8'));
const socialphobia = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_socialphobia_result.json'), 'utf8'));
const dark = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_dark_result.json'), 'utf8'));
const alone = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_alone_result.json'), 'utf8'));
const shyness = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_shyness_result.json'), 'utf8'));
const school = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_school_result.json'), 'utf8'));
const dog = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_dog_result.json'), 'utf8'));
const dependent = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_dependent_result.json'), 'utf8'));
const presentation = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_presentation_result.json'), 'utf8'));
const worry = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_worry_result.json'), 'utf8'));
const scolding = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_scolding_result.json'), 'utf8'));
const eyes = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_eyes_result.json'), 'utf8'));
const separation = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_separation_result.json'), 'utf8'));
const tension = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_tension_result.json'), 'utf8'));
const performance = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_performance_result.json'), 'utf8'));
const selective = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_selective_result.json'), 'utf8'));
const everything = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_everything_result.json'), 'utf8'));
const toy = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_toy_result.json'), 'utf8'));
const appetite = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_appetite_result.json'), 'utf8'));
const my = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_my_result.json'), 'utf8'));
const attention = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_attention_result.json'), 'utf8'));
const homework = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_homework_result.json'), 'utf8'));
const planning = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_planning_result.json'), 'utf8'));
const morning = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_morning_result.json'), 'utf8'));
const ocd = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_ocd_result.json'), 'utf8'));
const sitting = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_sitting_result.json'), 'utf8'));
const time = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_time_result.json'), 'utf8'));
const problem = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_problem_result.json'), 'utf8'));
const study = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_study_result.json'), 'utf8'));
const notice = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_notice_result.json'), 'utf8'));
const conversation = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_conversation_result.json'), 'utf8'));
const persistence = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_persistence_result.json'), 'utf8'));
const meal = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_meal_result.json'), 'utf8'));
const sensitive = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_sensitive_result.json'), 'utf8'));
const defense = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_defense_result.json'), 'utf8'));
const anger = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_anger_result.json'), 'utf8'));
const demand = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_demand_result.json'), 'utf8'));
const expression = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_expression_result.json'), 'utf8'));
const head = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_head_result.json'), 'utf8'));
const competition = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_competition_result.json'), 'utf8'));
const jealousy = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_jealousy_result.json'), 'utf8'));
const laugh = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_laugh_result.json'), 'utf8'));
const notlaugh = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_notlaugh_result.json'), 'utf8'));
const violence = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_violence_result.json'), 'utf8'));
const emotion = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_emotion_result.json'), 'utf8'));
const notdo = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_notdo_result.json'), 'utf8'));
const despair = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_despair_result.json'), 'utf8'));
const curse = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_curse_result.json'), 'utf8'));
const patience = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_patience_result.json'), 'utf8'));
const depression = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_depression_result.json'), 'utf8'));
const phone = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_phone_result.json'), 'utf8'));
const run = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_run_result.json'), 'utf8'));
const disorder = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_disorder_result.json'), 'utf8'));
const impulse = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_impulse_result.json'), 'utf8'));
const nofriend = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_nofriend_result.json'), 'utf8'));
const bully = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings', 'shy_bully_result.json'), 'utf8'));

export const titleObjs = {
  '수줍음/부끄러움': shy,
  '수줍음/낯선 상황과 사람 어려움': difficultyUnfamiliar,
  '수줍음/친구를 사귈 때 수줍음': makingFriends,
  '수줍음/사회공포증': socialphobia,
  '두려움/어둠에 대한 두려움': dark,
  '두려움/혼자 자는 것에 대한 두려움': alone,
  '두려움/낯가림': shyness,
  '두려움/학교에 대한 두려움': school,
  '두려움/개에 대한 두려움': dog,
  '두려움/의존적': dependent,
  '두려움/발표': presentation,
  '두려움/걱정': worry,
  '두려움/야단에 대한 두려움': scolding,
  '두려움/눈치': eyes,
  '분리/불안 분리 불안 현상': separation,
  '긴장/긴장해 있는 아이': tension,
  '긴장/수행 불안': performance,
  '긴장/선택적 함구증': selective,
  '욕심/모든 물건이 자기 것': everything,
  '욕심/장난감에 대한 욕심': toy,
  '욕심/식탐': appetite,
  '욕심/내 물건 건드리지 못하게 하는 아이': my,
  '주의력 결핍/주의 집중력': attention,
  '주의력 결핍/숙제': homework,
  '주의력 결핍/계획성 부족': planning,
  '주의력 결핍/아침잠 깨우기': morning,
  '주의력 결핍/건망증': ocd,
  '주의력 결핍/가만히 앉아있기': sitting,
  '주의력 결핍/시간 효율': time,
  '주의력 결핍/문제풀이 집중': problem,
  '주의력 결핍/공부 중 딴짓': study,
  '주의력 결핍/알림장': notice,
  '주의력 결핍/대화 집중': conversation,
  '주의력 결핍/끈기': persistence,
  '주의력 결핍/식사 시간': meal,
  '감정 조절/예민한 감각': sensitive,
  '감정 조절/상처 방어 수단으로서의 화': defense,
  '감정 조절/짜증': anger,
  '감정 조절/요구 표현의 방법': demand,
  '감정 조절/의사 표현으로서의 삐침': expression,
  '감정 조절/머리 박기': head,
  '감정 조절/경쟁': competition,
  '감정 조절/질투': jealousy,
  '감정 조절/웃음': laugh,
  '감정 조절/웃지 않음': notlaugh,
  '감정 조절/폭력': violence,
  '감정 조절/감정기복': emotion,
  '감정 조절/뭐든 안 하려는 아이': notdo,
  '감정 조절/좌절': despair,
  '감정 조절/욕': curse,
  '감정 조절/인내심': patience,
  '우울/아동 우울증': depression,
  '중독/휴대폰 중독': phone,
  '과잉행동/뛰어다님': run,
  '과잉행동/산만함': disorder,
  '과잉행동/충동': impulse,
  '또래 관계/친한 친구 없음': nofriend,
  '또래 관계/따돌림 가해자': bully,
}
