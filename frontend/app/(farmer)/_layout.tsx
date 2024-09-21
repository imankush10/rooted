import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ header: () => <CustomHeader /> }}
      />
     
    </Stack>
  );
};

export default Layout;
