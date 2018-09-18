<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2">
                <div class="col-12">
                    <OrderElements
                        :heading="heading"
                        :task="task"
                    ></OrderElements>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// http://paletton.com/#uid=10n0u0kt+lZlOstrKqzzSiaJidt

import OrderElements from './OrderElements.vue';

export default {
    components: {
        OrderElements
    },
	data() {
		return {
            heading: "Nynorsk.B.Tall skrevet med bokstaver",
            task: {
                text: "Arranger følgende tall etter størrelse: ",
                text2: "",
                elements: [
                    "en",
                    "to",
                    "tre",
                    "fire",
                    "fem",
                    "seks",
                    "sju",
                    "åtte",
                    "ni",
                    "ti",
                    "elleve",
                    "tolv",
                    "tretten",
                    "fjorten",
                    "femten",
                ]
            },
		};
    },
};
</script>

<style local>

</style>
