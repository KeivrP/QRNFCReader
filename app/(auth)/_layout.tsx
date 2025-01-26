import React, { useState, useEffect } from "react"
import { Redirect, Stack } from "expo-router"
import { useAuth } from "@/components/AuthContext";
import Loading from "@/components/ui/Loading"; // Import the Loading component


export default function RootLayout() {
  const { isAuthenticated: session } = useAuth()
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true

  useEffect(() => {
    // Simulate some loading time (replace with your actual logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set isLoading to false after 1 second (or your desired loading duration)
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  if (isLoading) {
    return <Loading />;
  }

  if (session) {
    return <Redirect href="/(tabs)/one" />;
  }
  console.log('session', session)
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="qrScreen" options={{ headerShown: false }} />
    </Stack>
  )
}
