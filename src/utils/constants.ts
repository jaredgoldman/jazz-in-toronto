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

export const MAX_FILE_SIZE = 2097152
export const MAX_FILE_SIZE_READABLE = '2MB'
