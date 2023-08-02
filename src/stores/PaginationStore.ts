import {defineStore} from "pinia";
import type { Ref } from "vue";
import {ref} from "vue";
import axios from "axios";

interface singleProduct {
    id: Number,
    SKU: String,
    size: String,
    photo_url: String,
    created_at: String
}
interface productResponse {
    data: [singleProduct],
    links: object,
    meta: paginationMetaType
}

interface paginationLink {
    url?: String,
    label: String,
    active: Boolean
}

interface paginationMetaType {
    current_page: Number,
    links: [paginationLink],
    total: Number,
    from: Number,
    to: Number
}

export const usePaginationStore = defineStore("pagination", () => {
    const apiUrl: Ref<String> = ref(import.meta.env.VITE_API_ENDPOINT  + 'products');

    const page: Ref<number> = ref(1);

    const products: Ref<[singleProduct]|null> = ref(null);
    const paginations: Ref<paginationMetaType> = ref({});

    function getUrl() {
        return apiUrl.value + '?page=' + page.value;
    }

    function updatePage(newPage) {
        page.value = newPage;
        getProducts();
    }

    function getProducts() {
        axios.get(getUrl(), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
            }
        }).then((response: axios.AxiosResponse<productResponse>) => {
            products.value = response.data.data;
            paginations.value = response.data.meta
        });
    }

    return {updatePage, products, paginations, getProducts}
});