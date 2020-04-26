import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
            primary: {500: "#F2B705"},
            // secondary: green,
    }
});

export default responsiveFontSizes(theme);