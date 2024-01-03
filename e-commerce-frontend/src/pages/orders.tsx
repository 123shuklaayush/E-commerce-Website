import { ReactElement, useState } from "react"
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table"
import { Link } from "react-router-dom";
type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}

const column: Column<DataType>[] =[
    {
    Header: 'ID',
    accessor: '_id',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Action',
        accessor: 'action',
    }

]
const Orders = () => {

    const [rows] = useState<DataType[]>([{
        _id: "sdfs",
    amount: 4314,
    quantity: 13,
    discount: 339,
    status: <span className="red">Processing</span>,
    action: <Link to={`/order/sdfs`}>View</Link>
    }
    ])

    const Table = TableHOC<DataType>(column,rows, "dashboard-product-box", "Orders"
    , rows.length > 6)()
  return (
    <div className="container">
        <h1>My Orders</h1>
        {Table}
    </div>
  )
}

export default Orders