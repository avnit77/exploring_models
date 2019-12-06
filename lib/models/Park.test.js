const Park = require('./Park');

describe('Park', () => {
  describe('name', () => {
    it('requires a name', () => {
      const park = new Park({
        hasPlayground: true,
        hasDogpark: true,
        quadrant: 'SE'
      });

      const { errors } = park.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });

  describe('hasPlayground', () => {
    it('requires hasPlayground', () => {
      const park = new Park({
        name: 'Mt. Tabor',
        hasDogpark: true,
        quadrant: 'SE'
      });

      const { errors } = park.validateSync();
      expect(errors.hasPlayground.message).toEqual('Path `hasPlayground` is required.');
    });
  });

  describe('hasDogpark', () => {
    it('requires hasDogpark', () => {
      const park = new Park({
        name: 'Mt. Tabor',
        hasPlayground: true,
        quadrant: 'SE'
      });

      const { errors } = park.validateSync();
      expect(errors.hasDogpark.message).toEqual('Path `hasDogpark` is required.');
    });
  });

  describe('quadrant', () => {
    it('requires quadrant', () => {
      const park = new Park({
        name: 'Mt. Tabor',
        hasPlayground: true,
        hasDogpark: true,
      });

      const { errors } = park.validateSync();
      expect(errors.quadrant.message).toEqual('Path `quadrant` is required.');
    });

    it('must be either SE, NE, NW, or SW', () => {
      const park = new Park({
        name: 'Mt. Tabor',
        hasPlayground: true,
        hasDogpark: true,
        quadrant: 'N is the 5th quadrant'
      });

      const { errors } = park.validateSync();
      expect(errors.quadrant.message).toEqual('`N is the 5th quadrant` is not a valid enum value for path `quadrant`.');
    });
  });
});
