<template>
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">วันที่</th>
                    <th scope="col">เลขเด่น</th>
                    <th scope="col">เลข 2 ตัว</th>
                    <th scope="col">เลข 3 ตัว</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"><input v-model="newData.day" type="text" placeholder="30 พฤษภาคม 2567"></th>
                    <td><input v-model="newData.number1" type="text"></td>
                    <td><input v-model="newData.number2" type="text"></td>
                    <td><input v-model="newData.number3" type="text"></td>
                    <td><button style="background-color: goldenrod;" class="btn"
                            @click="adddataNumber">เพิ่มข้อมูล</button></td>
                </tr>
                <tr v-for="(item, index) in reversedSheetDataNumber" :key="index">
                    <th scope="row">{{ item.day }}</th>
                    <td>{{ item.number1 }}</td>
                    <td>{{ item.number2 }}</td>
                    <td>{{ item.number3 }}</td>
                    <td>
                        <button v-if="index === 0" style="background-color: yellow;" class="btn"
                            @click="confirmDelete(item.id)">ลบ</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
export default {
    data() {
        return {
            sheetDataNumber: [],
            newData: {
                day: '',
                number1: '',
                number2: '',
                number3: ''
            },
            deletingItemId: null
        }
    },
    methods: {
        adddataNumber() {
            if (this.newData.day == '') {
                alert("กรอกข้อมูลให้ครบ")
                return
            } else {
                // Assuming sheetDataNumber is an array of data objects
                const dataObjects = this.sheetDataNumber;
                const userRef = firebase.database().ref('sheetDataNumber/' + dataObjects.length);
                userRef.set(this.newData)
                    .then(() => {
                        // Clear the form
                        this.newData = {
                            day: '',
                            number1: '',
                            number2: '',
                            number3: ''
                        };
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }


        },
        delnumber(id) {
            const userRef = firebase.database().ref('sheetDataNumber/' + id);
            userRef.remove()
                .then(() => {
                    console.log("Document successfully deleted!");
                    this.deletingItemId = null; // Reset deleting item id
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
        confirmDelete(id) {
            this.deletingItemId = id;
            // Here you can show a confirmation modal or dialog to confirm deletion
            // For simplicity, let's directly delete the item
            // You can enhance this to show a modal
            if (confirm("ต้องการลบข้อมูลหรือไม่?")) {
                this.delnumber(id);
            }
        },
    },
    computed: {
        reversedSheetDataNumber() {
            return this.sheetDataNumber.slice().reverse();
        }
    },
    mounted() {
        const userRef = firebase.database().ref('sheetDataNumber');
        userRef.on('value', (snapshot) => {
            const data = [];
            snapshot.forEach(Snapshot => {
                const Data = Snapshot.val();
                const sheetData = {
                    id: Snapshot.key,
                    day: Data.day,
                    number1: Data.number1,
                    number2: Data.number2,
                    number3: Data.number3
                };
                data.push(sheetData);
            });
            this.sheetDataNumber = data;
        });
    }
}
</script>

<style></style>
