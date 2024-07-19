import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [

  {
    title: 'books',
    path: '/demo',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
