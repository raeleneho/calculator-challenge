<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { compoundInterest, simpleInterest } from '../utils/helpers'

const valid = ref(false)

const currentMode: Ref<'simple' | 'compound'> = ref('compound')

const initialAmount = ref(100)
const interestRate = ref(5)
const investmentTermInMonths = ref(12)

const numberOfMonthsPerPayPeriod = ref(1)

const interestPaidSelection = ref('')

function hello() {
  interestPaidSelection.value === 'maturity'
    ? (currentMode.value = 'simple')
    : (currentMode.value = 'compound')

  if (interestPaidSelection.value === 'monthly') {
    return (numberOfMonthsPerPayPeriod.value = 12)
  } else if (interestPaidSelection.value === 'quarterly') {
    return (numberOfMonthsPerPayPeriod.value = 3)
  } else {
    return (numberOfMonthsPerPayPeriod.value = 1)
  }
}

// const numberOfMonthsPerPayPeriod = computed(() => {
//   if (interestPaidSelection.value === 'monthly') {
//     return 12
//   } else if (interestPaidSelection.value === 'quarterly') {
//     return 3
//   } else if (interestPaidSelection.value === 'annually') {
//     return 1
//   }
// })

const maturityAmount = computed(() => {
  return currentMode.value === 'simple'
    ? simpleInterest(initialAmount.value, interestRate.value, investmentTermInMonths.value)
    : compoundInterest(
        initialAmount.value,
        interestRate.value,
        investmentTermInMonths.value,
        numberOfMonthsPerPayPeriod.value
      )
})
</script>

<template>
  <v-container>
    {{ currentMode }}
    {{ numberOfMonthsPerPayPeriod }}

    {{ interestPaidSelection }}
    <v-card
      class="mx-auto px-6 py-8"
      max-width="500"
      rounded="rounded-lg"
      title="Term Deposit Calculator"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="initialAmount"
          variant="solo"
          label="Initial Amount"
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="interestRate"
          variant="solo"
          label="Interest Rate (% p.a.)"
          required
          clearable
        ></v-text-field>
        <!-- <v-text-field
          v-model="numberOfMonthsPerPayPeriod"
          variant="solo"
          label="Interest paid every n (month/s)"
          required
          clearable
        ></v-text-field> -->

        <div class="flex">
          <v-btn-toggle
            v-model="interestPaidSelection"
            @update:model-value="hello()"
            rounded="2"
            class="elevation-2"
            color="orange-accent-1"
            group
          >
            <v-btn value="monthly"> monthly </v-btn>

            <v-btn value="quarterly"> quarterly </v-btn>

            <v-btn value="annually"> annually </v-btn>
            <v-btn value="maturity"> at maturity </v-btn>
          </v-btn-toggle>
        </div>

        <v-text-field
          v-model="investmentTermInMonths"
          variant="solo"
          label="Investment Term (months)"
          required
          clearable
        ></v-text-field>

        {{ maturityAmount }}
      </v-form>
    </v-card>
  </v-container>
</template>
