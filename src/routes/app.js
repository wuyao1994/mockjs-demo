import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import List from './List'

function App({ children, app, loading }) {
    const { list } = app;
    const listProps = {
        loading,
        list
    }
    return (
        <List {...list} />
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)