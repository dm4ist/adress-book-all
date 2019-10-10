// Надеюсь такой регулярки хватит для проверки карты (хотя понимаю что нужно 
// проверка для двух первых цифр (Visa/MasterCard...), Проверка первых шести цифр (Банк Id) и Алгоритм Луна и т.д. 
const formatCard = /^[0-9]{16}$/;
const formatName = /^[A-Z]{1}[a-z]+$/;
const formatAge = /(?:\b|-)([1-9]{1,2}[0]?|100)\b/;
const formatTel = /^\+[0-9]{12}$/;
const formatEmail = /^[0-9a-z.-]{1,}@[a-z0-9.-]{1,}\.[a-z]{2,4}$/i;
const forBtn = document.getElementById('forBtn');
