import Router from "./router/Router.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

function App() {
    const dispatch = useDispatch();

    const theme = createTheme({
        // typography: {
        //     fontFamily: "Montserrat",
        // },
        palette: {
            secondary: {
                main: "#586c89",
            },
        },
    });

    useEffect(() => {
        // dispatch(auth());
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Toaster />
                <Router />
            </ThemeProvider>
        </div>
    );
}

export default App;
