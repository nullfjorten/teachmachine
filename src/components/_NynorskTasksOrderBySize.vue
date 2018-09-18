<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2">
                <div class="col-12">
                    <h1>{{ heading }}</h1>
                    <p>{{ task.text }}</p>
                    <p>{{ task.text2 }}</p>
                    <ul>
                        <draggable :list="answer.words" class="dragArea">
                            <li v-for="(word, index) in answer.words" :key="index" :class="{correct: isPlacedCorrectly(index)}">
                                {{ word }}
                            </li>
                        </draggable>
                    </ul>
                    <div v-if="isOrderedCorrectly">Riktig!</div>
                    <div v-else>Rekkefølgen er ikke riktig enda...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// http://paletton.com/#uid=10n0u0kt+lZlOstrKqzzSiaJidt

import draggable from 'vuedraggable';
import shuffleArray from 'shuffle-array';

export default {

    created() {
        this.answer.words = this.task.words.slice();
        shuffleArray(this.answer.words);
    },
    components: {
        draggable,
    },
    computed: {
        isOrderedCorrectly: function() {
            for (let i = 0; i < this.task.words.length; i++) {
                if (this.task.words[i] != this.answer.words[i]) {
                    return false;
                }
            }
            return true;
        }
    },
	data() {
		return {
            heading: "Nynorsk.A.Ord med om lag same tyding",
            task: {
                text: "Alle desse orda er namn på hus av ulike slag: ",
                text2: "Fyll ut dei opne romma slik at namna på husa ovanfor kjem i rekkje etter storleiken på husa!",
                words: [
                    "koie",
                    "hytte",
                    "villa",
                    "slott",
                    "palass",
                ]
            },
            answer: {
                words: []
            }
		};
    },
    methods: {
        isPlacedCorrectly: function(answerIndex) {
            if (this.task.words[answerIndex] == this.answer.words[answerIndex]) {
                return true;
            }
            return false;
        },
    }
};
</script>

<style local>
.color-primary-0 { color: #AF4A0B }	/* Main Primary color */
.color-primary-1 { color: #E38348 }
.color-primary-2 { color: #D4621C }
.color-primary-3 { color: #913700 }
.color-primary-4 { color: #6B2900 }

ul {
    list-style-type: none;
    padding-left: 1rem;
    margin: 0;
}

li {
    color: #E38348;
    padding: .2rem;
    border-radius: .2rem;
    cursor: grab;
    margin-bottom: 5px;
}
li.correct {
    color: #2F9609;
}
.dragArea {
    min-height: 10px;
    /*background-color: #E38348;*/
}
</style>
