<template>
    <div>
        <h1>{{ heading }}</h1>
        <p>{{ task.text }}</p>
        <p>{{ task.text2 }}</p>
        <ul>
            <draggable :list="answer.elements" class="dragArea">
                <li v-for="(word, index) in answer.elements" :key="index" :class="{correct: isPlacedCorrectly(index)}">
                    {{ word }}
                </li>
            </draggable>
        </ul>
        <div v-if="isOrderedCorrectly">Riktig!</div>
        <div v-else>Rekkefølgen er ikke riktig enda...</div>
    </div>
</template>

<script>
// http://paletton.com/#uid=10n0u0kt+lZlOstrKqzzSiaJidt

import draggable from 'vuedraggable';
import shuffleArray from 'shuffle-array';

export default {
    created() {
        this.answer.elements = this.task.elements.slice();
        shuffleArray(this.answer.elements);
    },
    components: {
        draggable,
    },
    computed: {
        isOrderedCorrectly: function() {
            for (let i = 0; i < this.task.elements.length; i++) {
                if (this.task.elements[i] != this.answer.elements[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    props: ['heading', 'task'],
	data() {
		return {
            answer: {
                elements: []
            }
		};
    },
    methods: {
        isPlacedCorrectly: function(answerIndex) {
            if (this.task.elements[answerIndex] == this.answer.elements[answerIndex]) {
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
