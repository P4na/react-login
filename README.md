Ho installato le dipendenze di fontawesome 

npm i  @fortawesome/fontawesome-svg-core
npm i @fortawesome/free-solid-svg-icons
npm i @fortawesome/react-fontawesome

e le utilizziamo dentro register

poi inseriamo le regex, non staro a spiegare come funzionano

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9])(?=.*[!@#$%]).{8,24}$)/;

poi inseriamo dentro al componente Register 
    const userRef = useRef()
    const errRef = useRef()

    useRef() ci permette di manipolare il dom direttamente dai components, in pratica e' per l'estetica

    e poi inserisce 

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

