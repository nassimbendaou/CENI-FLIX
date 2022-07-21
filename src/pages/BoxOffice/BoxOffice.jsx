import "./BoxOffice.scss"

import RowBoxOffice from "../../components/RowBoxOffice/RowBoxOffice"
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";

const BoxOffice = () => {
    const rows = useRetrieveData('BoxOffice');

    return (
        <motion.div
            className="BoxOffice"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
         
            {rows && rows.map(props => (
                <RowBoxOffice key={props.id} {...props} />
            ))}
            
        </motion.div>
    )
}

export default BoxOffice
