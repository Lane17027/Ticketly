import { GithubIcon } from '@primer/octicons-react'
export default function Footer() {
    return (
        <div>
            <div>This is the Footer</div>
            <div>
                <a href="https://github.com/account1">
                    <GithubIcon size={16} /> Account 1
                </a>
                <a href="https://github.com/account2">
                    <GithubIcon size={16} /> Account 2
                </a>
                <a href="https://github.com/account3">
                    <GithubIcon size={16} /> Account 3
                </a>
            </div>
        </div>
    )
}
