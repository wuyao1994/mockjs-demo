import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import List from './list'
import Modal from './modal'

function App({ children,dispatch, app, loading }) {
    const { list,modalVisible,modalType,currentItem } = app;
    const listProps = {
        loading:loading.effects['app/query'],
        dataSource:list,
        onAdd () {
            dispatch({
                type: 'app/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
        onDeleteItem (id) {
            dispatch({
                type: 'app/delete',
                payload: id,
            })
        },
        onEditItem (item) {
            dispatch({
                type: 'app/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            })
        },
    };
    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects['app/update'],
        title: `${modalType === 'create' ? 'Create Mapping' : 'Update Mapping'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
            dispatch({
                type: `app/${modalType}`,
                payload: data,
            })
        },
        onCancel () {
            dispatch({
                type: 'app/hideModal',
            })
        },
    }

    return (
        <div>
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading}))(App)