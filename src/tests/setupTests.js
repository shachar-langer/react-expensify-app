import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'

// Loading our environment variables for testing
DotEnv.config({ path: '.env.test' })

// Configuring 'Enzyme' to support React v16
Enzyme.configure({
    adapter: new Adapter()
})