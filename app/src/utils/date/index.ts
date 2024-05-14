import dayjs from 'dayjs'
import greetPlugin from 'dayjs-greet'

dayjs.extend(greetPlugin)

export const getFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const getFormattedTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export const getGreeting = (name: string, date = Date.now()) => {
  return dayjs(date).greet(` ${name}!`)
}
