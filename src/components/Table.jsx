import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';


const Table = () => {


    const [allCustomers, setAllCustomers] = useState([])
    const [allTransactions, setAllTransactions] = useState([])

    // GET All Customers
    const getCustomers = async () => {
        try {
            const { data } = await axiosInstance.get('customers')
            setAllCustomers(data)
        } catch (error) {
            console.log(error)
        }
    }

    // GET All Transactions
    const getTransactions = async () => {
        try {
            const { data } = await axiosInstance.get('transactions')
            setAllTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }
    // Filter CustomerName By ID 
    const HandelFilterByName = async (customerNameById)=>{
        try {
            const { data } = await axiosInstance.get(`transactions?customer_id=${customerNameById}`)
            setAllTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }

    // Filter CustomerName By Amount
    const HandelFilterByAmount = async (customerNameByAmount)=>{
        try {
            const { data } = await axiosInstance.get(`transactions?amount=${customerNameByAmount}`)
            setAllTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomers()
        getTransactions()
    }, [])



    const chartData = {
        labels: allTransactions.map(transaction => transaction.date),
        datasets: [
            {
                label: 'Transaction Amounts',
                data: allTransactions.map(transaction => transaction.amount),
                backgroundColor: 'rgba(65, 0, 120)',
                borderColor: 'rgb(50, 0, 100)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return <>

    <h2 className="mb-4 text-center text-3xl text-indigo-600 font-medium">
            Task for Route Tech Summit
    </h2>

        <div className="mb-4 p-4 shadow rounded-sm bg-white flex">

            <div className=" p-5 w-1/2">
                <label htmlFor="FilterByName" className="block text-sm font-medium text-gray-900"> Filter By Name :</label>
                <select
                    name="FilterByName"
                    id="FilterByName"
                    onChange={(e) => HandelFilterByName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg outline-none border-2  border-indigo-600 text-gray-700 sm:text-sm py-2 px-2"
                >
                    <option value="">Please select</option>
                    {allCustomers.map((customer)=>{
                        return <option key={customer.id} value={customer.id} >{customer.name}</option>
                    })}
                </select>
            </div>

            <div className=" p-5 w-1/2">
                <label htmlFor="FilterByAmount" className="block text-sm font-medium text-gray-900"> Filter By Amount :</label>
                <input
                    name="FilterByAmount"
                    id="FilterByAmount"
                    type="number"
                    onChange={(e) => HandelFilterByAmount(e.target.value)}
                    className="mt-1.5 w-full rounded-lg outline-none border-2  border-indigo-600 text-gray-700 sm:text-sm py-2 px-2"
                />
            </div>
        </div>


        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="text-white">
                    <tr className="bg-indigo-600 text-white font-medium text-base">
                        <th className="whitespace-nowrap px-4 py-2">Customer</th>
                        <th className="whitespace-nowrap px-4 py-2">Date</th>
                        <th className="whitespace-nowrap px-4 py-2">Amount</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 ">
                    {allTransactions.map((transaction) => {
                        return <tr key={transaction.id} className="hover:bg-slate-100 duration-150">
                            <td className=" whitespace-nowrap px-4 py-2 font-medium text-gray-900">{allCustomers.find(customer=> customer.id == transaction.customer_id)?.name}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.date}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.amount}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        <div className="mb-4 p-4 shadow rounded-sm bg-white flex">
            <div className=" p-5 w-full">
                <label htmlFor="FilterByName" className="block text-sm font-medium text-gray-900">Selected Customer By Charts :</label>
                <select
                    name="FilterByName"
                    id="FilterByName"
                    onChange={(e) => HandelFilterByName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg outline-none border-2  border-indigo-600 text-gray-700 sm:text-sm py-2 px-2"
                >
                    <option value="">Please select</option>
                    {allCustomers.map((customer) => {
                        return <option key={customer.id} value={customer.id} >{customer.name}</option>
                    })}
                </select>
            </div>
        </div>

        <div className="mb-10 w-2/3 mx-auto">
                <Line data={chartData} options={options} />
        </div>
    </>
}


export default Table;