<script setup>
  import fidicare from './data/fidicare.json'
</script>

<template>
  <section class="section theme-light">
    <div class="container">
      <b-field label="Technologie" grouped group-multiline>
        <b-button size="is-small" @click="selectedTechnologies = []" :type="selectedTechnologies.length == 0 ? 'is-dark' : ''" class="mr-3 has-text-weight-bold">Alle anzeigen</b-button>
        <b-checkbox-button v-model="selectedTechnologies" v-for="(item, index) in uniqueTechnologies" :native-value="item" size="is-small" type="is-info">{{ item }}</b-checkbox-button>
      </b-field>

      <b-field label="Arbeitsart" grouped group-multiline>
        <b-button size="is-small" @click="selectedTypes = []" :type="selectedTypes.length == 0 ? 'is-dark' : ''" class="mr-3 has-text-weight-bold">Alle anzeigen</b-button>
        <b-checkbox-button v-model="selectedTypes" v-for="(item, index) in uniqueTypes" :native-value="item" size="is-small" type="is-info">{{ item }}</b-checkbox-button>
      </b-field>

      <b-field class="mt-5 has-text-weight-bold">
        <b-tag type="is-dark" class="mr-1">{{ filteredData.length }}</b-tag>
        <span>Pflegeprodukte</span>
      </b-field>

      <hr class="is-invisible">

      <b-table
        :data="filteredData"
        sort-icon="chevron-up"
        sortIconSize="is-small"
        sort-icon-desc="chevron-down"
        paginated
        per-page="10">
          <b-table-column field="id" label="#" sortable v-slot="props">
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="name" label="Produktname" sortable searchable v-slot="props">
            <a :href="props.row.url" target="_blank" rel="noopener, noreferrer">
              {{ props.row.name }}
            </a>
          </b-table-column>
          <b-table-column field="type" label="Arbeitsart" sortable v-slot="props">
            {{ props.row.type }}
          </b-table-column>
          <b-table-column field="technology" label="Technologie" sortable v-slot="props">
            {{ props.row.technology }}
          </b-table-column>
          <b-table-column field="description" label="Beschreibung" searchable v-slot="props">
            {{ props.row.description }}
          </b-table-column>
      </b-table>
    </div>
  </section>
</template>

<script>
    export default {
        data() {
            return {
                selectedTypes: [],
                selectedTechnologies: []
            }
        },
        computed: {
          filteredData: function () {
            // Daten ggfs. filtern und bereit stellen
            return fidicare.filter(item =>
              (this.selectedTypes.length === 0 || this.selectedTypes.includes(item.type)) &&
              (this.selectedTechnologies.length === 0 || this.selectedTechnologies.includes(item.technology))
            )
          },
          uniqueTypes: function () {
            return [...new Set( fidicare.map(eintrag => eintrag.type) )] // Eindeutige Werte aus den Daten filtern
          },
          uniqueTechnologies: function () {
            return [...new Set( fidicare.map(eintrag => eintrag.technology) )] // Eindeutige Werte aus den Daten filtern
          }
        }
    }
</script>
