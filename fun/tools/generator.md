# 🔑 密码与ID生成器

<script setup>
import { ref } from 'vue'

// ==================== 密码生成器 ====================
const passwordLength = ref(18)
const includeUpper = ref(true)
const includeLower = ref(true)
const includeDigits = ref(true)
const includeSymbols = ref(true)
const generatedPassword = ref('')
const copySuccess = ref('')

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_-+=<>?/|'

function generatePassword() {
  let charset = ''
  if (includeUpper.value) charset += UPPER
  if (includeLower.value) charset += LOWER
  if (includeDigits.value) charset += DIGITS
  if (includeSymbols.value) charset += SYMBOLS
  if (charset === '') {
    generatedPassword.value = '请至少选择一项'
    return
  }
  let pwd = ''
  const len = passwordLength.value
  for (let i = 0; i < len; i++) {
    pwd += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  generatedPassword.value = pwd
}

// ==================== 假ID生成器 ====================
const generatedId = ref('')

const surnames = [
  '李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
  '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
  '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
  '程', '曹', '袁', '邓', '许'
]

const givenNames = [
  '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋',
  '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '华', '平',
  '刚', '桂花', '文', '卉', '慧', '宇', '琳', '浩', '雪', '晨',
  '博', '曦', '瑶', '毅', '萱', '哲', '彤', '昊', '悦', '辰'
]

const englishNames = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
  'Kevin', 'Lily', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rose', 'Sam', 'Tina',
  'Uma', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zack', 'Amber', 'Bruce', 'Cindy', 'Dave',
  'Ella', 'Finn', 'Gina', 'Hank', 'Iris', 'Jake', 'Kara', 'Leo', 'Mona', 'Nick',
  'Oscar', 'Paula', 'Quincy', 'Rita', 'Steve', 'Tracy', 'Ulysses', 'Vera', 'Willow', 'Xena',
  'Yale', 'Zoe', 'Adam', 'Bella', 'Carl', 'Daisy', 'Edward', 'Fiona', 'George', 'Holly',
  'Ivan', 'Julia', 'Kyle', 'Laura', 'Mark', 'Nina', 'Owen', 'Penny', 'Ray', 'Sara',
  'Tom', 'Una', 'Vince', 'Wade', 'Xia', 'Yuki', 'Zane', 'Amy', 'Brad', 'Cara'
]

function randomString(length) {
  let result = ''
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function randomPinyinName() {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const given = givenNames[Math.floor(Math.random() * givenNames.length)]
  return surname + given
}

function randomEnglishName() {
  return englishNames[Math.floor(Math.random() * englishNames.length)]
}

function randomDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
  return month + day
}

function randomYear() {
  return String(Math.floor(Math.random() * 46) + 1980)
}

function randomFuyuann() {
  const consonants = ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s']
  const vowels = ['a','o','e','i','u']
  const pairs = Math.floor(Math.random() * 3) + 3
  let result = ''
  for (let i = 0; i < pairs; i++) {
    result += consonants[Math.floor(Math.random() * consonants.length)]
    result += vowels[Math.floor(Math.random() * vowels.length)]
  }
  return result
}

function generateId() {
  const strategy = Math.floor(Math.random() * 8) + 1
  switch (strategy) {
    case 1:
      generatedId.value = randomFuyuann()
      break
    case 2:
      generatedId.value = randomEnglishName() + randomDate()
      break
    case 3:
      generatedId.value = randomPinyinName() + randomDate()
      break
    case 4:
      generatedId.value = randomPinyinName() + randomYear()
      break
    case 5:
      generatedId.value = randomEnglishName() + randomEnglishName()
      break
    case 6:
      generatedId.value = randomString(8) + randomDate()
      break
    case 7:
      generatedId.value = randomString(6) + randomYear()
      break
    case 8:
      generatedId.value = randomString(10) + String(Math.floor(Math.random() * 9000) + 1000)
      break
  }
}

// ==================== 复制功能 ====================
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    copySuccess.value = '复制成功啦！'
    setTimeout(() => {
      copySuccess.value = ''
    }, 2000)
  }).catch(() => {
    copySuccess.value = '复制失败，请手动复制'
    setTimeout(() => {
      copySuccess.value = ''
    }, 2000)
  })
}
</script>

## 🔐 密码生成小工具

<div style="background-color: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
  <div style="margin-bottom: 15px;">
    <label style="margin-right: 10px; font-weight: bold;">密码长度：</label>
    <input type="number" v-model.number="passwordLength" min="6" max="30" style="width: 80px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
    <span style="margin-left: 8px; color: #888; font-size: 13px;">（6-30）</span>
  </div>

  <div style="margin-bottom: 15px;">
    <label style="margin-right: 15px; cursor: pointer;">
      <input type="checkbox" v-model="includeUpper"> 含大写
    </label>
    <label style="margin-right: 15px; cursor: pointer;">
      <input type="checkbox" v-model="includeLower"> 含小写
    </label>
    <label style="margin-right: 15px; cursor: pointer;">
      <input type="checkbox" v-model="includeDigits"> 含数字
    </label>
    <label style="margin-right: 15px; cursor: pointer;">
      <input type="checkbox" v-model="includeSymbols"> 含符号
    </label>
  </div>

  <div
    @click="generatedPassword && copyText(generatedPassword)"
    style="background-color: #f9f9f9; border: 2px dashed #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; font-family: 'Courier New', monospace; font-size: 18px; cursor: pointer; word-break: break-all; text-align: center; min-height: 24px;"
    :style="{ borderColor: generatedPassword ? '#96c8e6' : '#ddd' }"
  >
    {{ generatedPassword || '点击下方按钮生成密码' }}
  </div>

  <div style="text-align: center;">
    <button @click="generatePassword" style="background-color: #ff7777; color: white; border: none; padding: 10px 30px; border-radius: 6px; font-size: 16px; cursor: pointer;">
      生成密码
    </button>
  </div>
</div>

<hr>

## 🆔 ID生成小工具

<div style="background-color: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
  <div
    @click="generatedId && copyText(generatedId)"
    style="background-color: #f9f9f9; border: 2px dashed #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; font-family: 'Courier New', monospace; font-size: 18px; cursor: pointer; word-break: break-all; text-align: center; min-height: 24px;"
    :style="{ borderColor: generatedId ? '#96c8e6' : '#ddd' }"
  >
    {{ generatedId || '点击下方按钮生成账号ID' }}
  </div>

  <div style="text-align: center;">
    <button @click="generateId" style="background-color: #ff7777; color: white; border: none; padding: 10px 30px; border-radius: 6px; font-size: 16px; cursor: pointer;">
      生成账号ID
    </button>
  </div>
</div>

<!-- 复制成功提示 -->
<div v-if="copySuccess" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.75); color: white; padding: 15px 30px; border-radius: 8px; font-size: 16px; z-index: 9999; pointer-events: none;">
  {{ copySuccess }}
</div>