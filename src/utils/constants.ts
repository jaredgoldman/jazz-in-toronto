export const getDaysOfTheWeek = (type: 'short' | 'long') => {
    return type === 'long'
        ? [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
          ]
        : ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
}
