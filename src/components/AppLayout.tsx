import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Box, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { appLayoutStyles } from './AppLayout.styles'

const menuItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'List', path: '/list' },
]

function DrawerContent({
  onItemClick,
  autoFocusFirstItem = false,
}: {
  onItemClick?: () => void
  autoFocusFirstItem?: boolean
}) {
  return (
    <Box sx={appLayoutStyles.drawerContent}>
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            autoFocus={autoFocusFirstItem && index === 0}
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onItemClick}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default function AppLayout() {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={appLayoutStyles.root}>
      <Box sx={appLayoutStyles.mobileHeader}>
        <IconButton
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          sx={appLayoutStyles.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={appLayoutStyles.temporaryDrawer}
      >
        <DrawerContent autoFocusFirstItem onItemClick={() => setOpen(false)} />
      </Drawer>

      <Drawer variant="permanent" open sx={appLayoutStyles.permanentDrawer}>
        <DrawerContent />
      </Drawer>

      <Box component="main" sx={appLayoutStyles.main}>
        <Outlet />
      </Box>
    </Box>
  )
}
