<template>
    <div>
        <h1>รายการซื้อคาร์บอนเครดิต</h1>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2';
export default {
    layout: 'menu-profile',
    data() {
        return {
            formList: [],
        }
    },

    mounted() {

    },

    methods: {
        fetchData() {
            firebase.database().ref('T-VER-Form').orderByChild('status').equalTo('4').on('value', snapshot => {
                const data = snapshot.val();
                this.formList = Object.entries(data || {}).map(([id, formData]) => ({ id, ...formData }));

            });
        },
    }
}
</script>