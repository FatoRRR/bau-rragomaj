<template>
  <div>pdf</div>
  <div>
    <canvas ref="canvas" />
  </div>
  <!-- <div
    v-for="pageNumber in pdf.numPages"
    :key="pageNumber"
  >
    <canvas ref="canvas" />
  </div> -->
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/webpack';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default {
  name: 'PDFViewer',
  data() {
    return {
      pdf: null,
    };
  },
  mounted() {
    this.loadPdf();
  },
  methods: {
    async loadPdf() {
      pdfjsLib.getDocument('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS').promise.then((pdf) => {
        // Code to handle the loaded PDF document
        console.warn("pdf", pdf);
        pdf.getPage(pageNumber)
          .then((page) => {
            console.warn("page", page);
            const canvas = this.$refs.canvas[pageNumber - 1];
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            page.render({
              canvasContext: context,
              viewport,
            });
          });
      });
    },
  },
}
</script>
