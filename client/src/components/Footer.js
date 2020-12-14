import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Garden Tracker
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Footer() {

    return (

        <Container component="main" maxWidth="xs">
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )

}

export default Footer