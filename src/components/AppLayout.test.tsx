import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import AppLayout from './AppLayout'

function renderAppLayout(initialPath = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard page content</div>,
          },
          {
            path: 'list',
            element: <div>List page content</div>,
          },
        ],
      },
    ],
    {
      initialEntries: [initialPath],
    },
  )

  return {
    router,
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  }
}

describe('AppLayout', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render desktop navigation links', () => {
    renderAppLayout()

    expect(screen.getAllByRole('link', { name: 'Dashboard' })).toHaveLength(1)
    expect(screen.getAllByRole('link', { name: 'List' })).toHaveLength(1)
  })

  it('should render outlet content', () => {
    renderAppLayout('/list')

    expect(screen.getByText('List page content')).toBeInTheDocument()
  })

  it('should navigate when clicking desktop list link', async () => {
    const { user } = renderAppLayout()

    await user.click(screen.getByRole('link', { name: 'List' }))

    expect(screen.getByText('List page content')).toBeInTheDocument()
  })

  it('should close drawer after clicking a drawer item', async () => {
    const { user } = renderAppLayout()

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const drawer = screen.getByRole('dialog')

    await user.click(within(drawer).getByRole('link', { name: 'List' }))

    expect(await screen.findByText('List page content')).toBeInTheDocument()
  })

  it('should close drawer after clicking a drawer item', async () => {
    const { user, router } = renderAppLayout()

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const drawer = screen.getByRole('dialog')

    await user.click(within(drawer).getByRole('link', { name: 'List' }))

    expect(router.state.location.pathname).toBe('/list')
  })
})
