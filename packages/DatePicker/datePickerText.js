// from https://github.com/airbnb/react-dates/blob/master/src/defaultPhrases.js
const calendarLabel = 'Calendrier'
const roleDescription = 'Sélecteur de date'
const closeDatePicker = 'Fermer '
const clearDate = 'Supprimer la date'
const jumpToPrevMonth = 'Reculer pour passer au mois précédent.'
const jumpToNextMonth = 'Avancer pour passer au mois suivant.'
const keyboardShortcuts = 'Raccourcis clavier '
const showKeyboardShortcutsPanel = 'Ouvrir le panneau de raccourcis clavier.'
const hideKeyboardShortcutsPanel = 'Fermez le panneau de raccourcis.'
const openThisPanel = 'Ouvrir le panneau. '
const enterKey = 'Touche Entrée '
const leftArrowRightArrow = 'Touches de direction droite et gauche'
const upArrowDownArrow = 'Touches de direction haut et bas'
const pageUpPageDown = 'Touches Page précédente et Page suivante'
const homeEnd = 'Touches Accueil et Fin'
const escape = 'Touche Échap.'
const questionMark = `Point d'interrogation`
const selectFocusedDate = 'Sélectionner la date mise au point.'
const moveFocusByOneDay = `Reculer (à gauche) et avancer (à droite) d'un jour.`
const moveFocusByOneWeek = `Reculer (vers le haut) et avancer (vers le bas) d'une semaine.`
const moveFocusByOneMonth = 'Changer de mois.'
const moveFocustoStartAndEndOfWeek = 'Aller au premier ou au dernier jour de la semaine.'
const returnFocusToInput = 'Revenir au champ de saisie de la date.'
const keyboardForwardNavigationInstructions = `Naviguer vers l'avant pour interagir avec le calendrier et sélectionner une date. Appuyer sur la touche Point d'interrogation pour obtenir les raccourcis clavier permettant de modifier les dates.`
const keyboardBackwardNavigationInstructions = `Naviguer en arrière pour interagir avec le calendrier et sélectionner une date. Appuyer sur la touche Point d'interrogation pour obtenir les raccourcis clavier permettant de modifier les dates.`

const chooseAvailableStartDate = ({ date }) => `Choisir ${date}. Disponible.`
const chooseAvailableEndDate = ({ date }) => `Non disponible. ${date}`
const chooseAvailableDate = ({ date }) => date
const dateIsUnavailable = ({ date }) => `Not available. ${date}`
const dateIsSelected = ({ date }) => `Choisie. ${date}`
const dateIsSelectedAsStartDate = ({ date }) => `Choisie comme date de début. ${date}`
const dateIsSelectedAsEndDate = ({ date }) => `Choisie comme date de fin. ${date}`

const copyDictionary = {
  en: undefined, // uses react-dates defaults
  fr: {
    calendarLabel,
    roleDescription,
    jumpToPrevMonth,
    jumpToNextMonth,
    keyboardShortcuts,
    showKeyboardShortcutsPanel,
    hideKeyboardShortcutsPanel,
    openThisPanel,
    enterKey,
    leftArrowRightArrow,
    upArrowDownArrow,
    pageUpPageDown,
    homeEnd,
    escape,
    questionMark,
    selectFocusedDate,
    moveFocusByOneDay,
    moveFocusByOneWeek,
    moveFocusByOneMonth,
    moveFocustoStartAndEndOfWeek,
    returnFocusToInput,
    chooseAvailableStartDate,
    chooseAvailableEndDate,
    chooseAvailableDate,
    dateIsUnavailable,
    dateIsSelected,
    dateIsSelectedAsStartDate,
    dateIsSelectedAsEndDate,

    closeDatePicker,
    clearDate,
    keyboardForwardNavigationInstructions,
    keyboardBackwardNavigationInstructions,
  },
}

export default copyDictionary
