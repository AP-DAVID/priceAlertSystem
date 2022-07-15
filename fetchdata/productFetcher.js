import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/product/fetcher"

export function getProduct(id){
    const {data, error} = useSWR(`${baseUrl}/${id}`, fetcher, { refreshInterval: 1000 })
    
    return{
        product: data,
        isLoading: !error && !data,
        isError: error
    }
}
