let a = 132n

for (let i = 0; i < 5; i++) {
  let left
  left = a - (a / 10n) * 10n
  a = a / 10n
  console.log(left)
}

// console.log(a,b)
