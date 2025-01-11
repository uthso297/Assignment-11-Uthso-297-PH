import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";
const PageTitle = ({ title }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </HelmetProvider>
    );
};
PageTitle.propTypes = {
    title: PropTypes.string
}

export default PageTitle;