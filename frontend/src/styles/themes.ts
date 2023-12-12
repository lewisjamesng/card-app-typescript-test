export const darkModeStyles = (darkMode: boolean) => {
  const lightModeStyles = {
    textColor: 'text-black',
    bgColor: 'bg-gray-200',
    cardBgColor: 'bg-gray-300',
    cardShadow: 'shadow-gray-500',
    buttonDeleteBgColor: 'bg-red-500 hover:bg-red-700',
    buttonEditBgColor: 'bg-blue-500 hover:bg-blue-700',
  }

  const darkModeStyles = {
    textColor: 'text-white',
    bgColor: 'bg-gray-800',
    cardBgColor: 'bg-gray-700',
    cardShadow: 'shadow-gray-700',
    buttonDeleteBgColor: 'bg-red-700 hover:bg-red-900',
    buttonEditBgColor: 'bg-blue-700 hover:bg-blue-900',
  }

  return darkMode ? darkModeStyles : lightModeStyles
}
