import Menu from "./Menu"
import Footer from './Footer'

function BaseLayout(props) {


    return(
        <div>
            <Menu />
            {props.children}
            <Footer />

        </div>
    )
}

export default BaseLayout