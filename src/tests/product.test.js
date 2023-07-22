const supertest = require('supertest');
const app = require('../index');

describe('product', () => {
  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it('should return a 404', async () => {
        const productSlug = 'charcoal-123';

        await supertest(app)
          .get(`/v1/product/getsingleproduct/${productSlug}`)
          .expect(404)
          .expect('{"message":"Product not found"}')
          .timeout(10000);
      });
    });

    describe('given the product does exist', () => {
      it('should return a 200', async () => {
        const productSlug = 'product-1';

        await supertest(app)
          .get(`/v1/product/getsingleproduct/${productSlug}`)
          .expect(200)
          .timeout(10000);
      });
    });
  });
});
