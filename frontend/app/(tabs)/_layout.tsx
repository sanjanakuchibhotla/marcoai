import { Tabs } from 'expo-router'

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="Home" options={{ headerShown: false }} />
            <Tabs.Screen name="Chat" options={{headerShown: false}} />
        </Tabs>
    )
}