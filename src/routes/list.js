import { Table, Modal, Input, Icon, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types'
import { DropOption } from '../components'

const confirm = Modal.confirm

function List ({onDeleteItem, onEditItem, dataSource, loading,onAdd}){

    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: 'Are you sure delete this record?',
                onOk () {
                    onDeleteItem(record.id)
                },
            })
        }
    }

    const columns = [{
        title: 'path',
        dataIndex: 'path',
        width: '30%',
    },{
        title: 'redirect',
        dataIndex: 'redirect',

    },{
        title: 'Operation',
        key: 'operation',
        width: 100,
        render: (text, record) => {
            return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        },
    },];

    return (
        <div>
            <Button className="editable-add-btn" onClick={onAdd}>Add</Button>
            <Table bordered dataSource={dataSource} loading={loading} columns={columns} />
        </div>
    );

}
List.propTypes = {
    loading: PropTypes.bool,
    dataSource: PropTypes.array,
    onAdd: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
}
export default List;